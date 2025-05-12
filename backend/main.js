import express from "express"
import { PrismaClient } from './generated/prisma/index.js'
import express_openid from "express-openid-connect"
const { auth, requiresAuth } = express_openid;
// add env variables to process.env
import "dotenv/config"

const app = express();
const prisma = new PrismaClient();

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://grapevine35l.us.auth0.com'
};

// Once authenticated, setup a new DB account if necessary.
// throws on failure.
async function syncUser(oidc) {
  const user = await prisma.user.findUnique({
    where: {
      authSub: oidc.user.sub
    }
  });
  if (!user) {
    return createUser(oidc);
  } else {
    return user;
  }
}

// throws on failure.
async function createUser(oidc) {
  let now = new Date();
  return await prisma.user.create({
    data: {
      email: oidc.user.email,
      name: oidc.user.name,
      createDt: now,
      updateDt: now,
      authSub: oidc.user.sub,
    }
  });
}

// application/json parser
app.use(express.json());
app.use(auth(authConfig));

app.get("/", async (req, res) => {
  res.redirect('/index.html')
});

app.get("/user", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch(e) {
    console.log(e);
    return;
  }

  const { name, email } = req.oidc.user;
  res.json({ name, email, db: user });
});

app.post("/createevent", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch(e) {
    console.log(e);
    return;
  }

  if (!req.body) {
    // Bad Request
    res.sendStatus(400)
    return;
  }

  try {
    let now = new Date()
    await prisma.event.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        startDt: new Date(req.body.startDt),
        endDt: new Date(req.body.endDt),
        createDt: now,
        updateDt: now,
        // this automatically creates the foreign key relation
        userId: user.userId
      }
    })
    // OK
    res.sendStatus(201)
  } catch (e) {
    // Bad Request
    console.log(e)
    res.sendStatus(400)
  }

})

/*
```
type Req {
  userId: number,
  eventId: number,
}

returns Event model
```
*/
app.post("/getevent", async (req, res) => {
  if (!req.body) {
    // Bad Request
    res.sendStatus(400);
  }

  // TODO: Check if user is authorized or perhaps if this is "public".
  if (req.body._) {
    // Not Authorized
    res.sendStatus(401);
    return;
  }

  let ret;
  try {
    ret = await prisma.event.findUniqueOrThrow({
      where: {
        id: req.body.eventId,
        userId: req.body.userId,
      }
    });
  } catch (e) {
    // Bad Request
    res.sendStatus(400);
    return;
  }

  return ret;
});

/*
```
type EventDiff {
  name: Optional<String>,
  description: Optional<String>,
  startDt: Optional<String>,
  endDt: Optional<String>,
}

type Req {
  userId: number,
  eventId: number,
  diff: EventDiff,
}
```
*/
app.post("/updateevent", async (req, res) => {
  if (!req.body) {
    // Bad Request
    res.sendStatus(400);
    return;
  }

  // TODO: Check if user is authorized.
  if (req.body._) {
    // Not Authorized
    res.sendStatus(401);
    return;
  }

  // TODO: Check integrity of dates, ie end after start
  // TODO: Check that name is not "strange looking"

  let updateTime = new Date();
  const updateData = {
    name: req.body.diff.name,
    description: req.body.diff.description,
    start_dt: req.body.diff.start_dt,
    end_dt: req.body.diff.end_dt,
    update_dt: updateTime,
  };

  try {
    await prisma.event.update({
      where: {
        id: req.body.eventId,
        userId: req.body.userId,
      },
      data: updateData,
    });
  } catch (e) {
    // Bad Request
    res.sendStatus(400);
    return;
  }
})

app.use(express.static("../dist"));

try {
  console.log("Now listening on port 3000");
  app.listen(3000);
} finally {
  await prisma.$disconnect();
}
