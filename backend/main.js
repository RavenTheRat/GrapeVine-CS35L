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
  const now = new Date();
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
    // Bad Request
    res.sendStatus(400)
    return;
  }

  const { name, email } = req.oidc.user;
  res.send({ name, email, db: user });
});

app.post("/event/new", requiresAuth(), async (req, res) => {
  if (!req.body) {
    // Bad Request
    res.sendStatus(400)
    return;
  }

  let user;
  try {
    user = await syncUser(req.oidc);
  } catch(e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400)
    return;
  }

  try {
    const now = new Date()
    const startDt = new Date(req.body.startDt);
    const endDt = new Date(req.body.endDt);
    if (startDt > endDt) {
      // Bad Request
      res.status(400).send("Start date cannot be later than end date");
      return;
    }
    const event = await prisma.event.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        startDt: startDt,
        endDt: endDt,
        createDt: now,
        updateDt: now,
        // this automatically creates the foreign key relation
        userId: user.id
      }
    })
    res.send({
      eventId: event.id
    });
  } catch (e) {
    console.log(e)
    // Bad Request
    res.sendStatus(400)
  }
})

app.get("/event/:id", requiresAuth(), async (req, res) => {
  if (!req.body) {
    // Bad Request
    res.sendStatus(400);
    return;
  }

  let user;
  try {
    user = await syncUser(req.oidc);
  } catch(e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400)
    return;
  }

  try {
    const event = await prisma.event.findUniqueOrThrow({
      where: {
        // req.params.id refers to :id
        id: req.params.id,
        userId: user.id,
      }
    });
    res.send({
      name: event.name,
      description: event.description,
      startDt: event.startDt,
      endDt: event.endDt,
      createDt: event.createDt,
      updateDt: event.updateDt,
      userId: event.userId,
    })
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400)
  }
});

app.post("/event/:id", requiresAuth(), async (req, res) => {
  if (!req.body) {
    // Bad Request
    res.sendStatus(400);
    return;
  }

  let user;
  try {
    user = await syncUser(req.oidc);
  } catch(e) {
    console.log(e);
    return;
  }

  const startDt = new Date(req.body.startDt);
  const endDt = new Date(req.body.endDt);
  if (startDt > endDt) {
    // Bad Request
    res.status(400).send("Start date cannot be later than end date");
    return;
  }

  const now = new Date();
  const updateData = {
    name: req.body.name,
    description: req.body.description,
    startDt: startDt,
    endDt: endDt,
    updateDt: now,
  };

  try {
    await prisma.event.update({
      where: {
        // req.params.id refers to :id
        id: req.params.id,
        userId: user.id,
      },
      data: updateData,
    });
    // OK
    res.send(200)
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
  }
})

app.use(express.static("../dist"));

try {
  console.log("Now listening on port 3000");
  app.listen(3000);
} finally {
  await prisma.$disconnect();
}
