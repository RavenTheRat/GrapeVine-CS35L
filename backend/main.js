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

// throws the http status code on failure.
async function getUserInfoWithEmail(email) {
  let user;
  try {
    user = await prisma.user.findFirst({
      where: {
        OR: [
          { AND: { email } }
        ]
      }
    });
  } catch (e) {
    throw 400;
  }

  if (!user) {
    throw 404;
  }

  return {
    id: user.id,
    name: user.name
  }
}

// application/json parser
app.use(express.json());
app.use(auth(authConfig));

app.get("/", async (req, res) => {
  res.redirect('/index.html');
});

app.get("/user", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }

  res.send(user);
});

// To avoid confusion, I avoided using a query param.
app.post("/user/byemail/", requiresAuth(), async (req, res) => {
  try {
    res.send(await getUserInfoWithEmail(req.body.email));
  } catch(status) {
    res.sendStatus(status);
  }
});

app.post("/event/new", requiresAuth(), async (req, res) => {
  if (!req.body) {
    // Bad Request
    res.sendStatus(400);
    return;
  }

  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }

  try {
    const now = new Date();
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
        userId: user.id,
        // Thomas's changes: I'm not sure what I'm doing so these could break it
        isPublic: req.body.isPublic
      }
    });
    res.send(event);
  } catch (e) {
    console.log(e)
    // Bad Request
    res.sendStatus(400);
  }
});

app.get("/event/:id", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }

  try {
    const event = await prisma.event.findUniqueOrThrow({
      where: {
        // req.params.id refers to :id
        id: Number(req.params.id),
        userId: user.id,
      }
    });
    res.send(event);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
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
  } catch (e) {
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
    isPublic: req.body.isPublic
  };

  try {
    const event = await prisma.event.update({
      where: {
        // req.params.id refers to :id
        id: Number(req.params.id),
        userId: user.id,
      },
      data: updateData,
    });
    res.send(event);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
  }
});

app.delete("/event/:id", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    return;
  }

  try {
    await prisma.event.delete({
      where: {
        // req.params.id refers to :id
        id: Number(req.params.id),
        userId: user.id,
      }
    });
    // OK
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
  }
});

app.get("/events", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }

  try {
    const events = await prisma.event.findMany({
      where: {
        userId: user.id,
      }
    });
    res.send(events);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
  }
});

app.get("/events/public", async (_req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: {
          isPublic: true,
      },
      include: {
        user: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        startDt: "asc",
      }
    });

    res.send(events);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }
});

app.post("/friends/add", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    return;
  }

  let recvUserId;
  if (req.body.email) {
    try {
      recvUserId = (await getUserInfoWithEmail(req.body.email)).id;
    } catch (status) {
      res.sendStatus(status);
      return;
    }
  } else if (req.body.userId) {
    recvUserId = req.body.userId;
  } else {
    // Bad Request
    res.sendStatus(400);
    return;
  }

  // Check that user is not friending themselves.
  if (recvUserId == user.id) {
    // Bad Request
    res.sendStatus(400);
    return;
  }

  // Check that the recvUser does exist.
  try {
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }

  // Check that this connection doesn't already. 
  try {
    let maybeConnection = await prisma.friendConnection.findFirst({
      where: {
        OR: [
          { AND: { sendUserId: user.id } },
          { AND: { recvUserId: recvUserId } },
        ]
      }
    });

    if (maybeConnection != null) {
      res.sendStatus(200);
      return;
    }

  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }

  // Create the connection
  try {
    await prisma.friendConnection.create({
      data: {
        sendUserId: user.id,
        recvUserId: recvUserId,
      }
    });
  } catch (e) {
    console.log(e);
    // Internal Error
    res.sendStatus(500);
    return;
  }
});

app.post("/friends/remove", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    return;
  }

  let recvUserId = req.body.userId;

  try {
    await prisma.friendConnection.deleteMany({
      where: {
        sendUserId: user.id,
        recvUserId: recvUserId,
      }
    });
  } catch (e) {
    console.log(e);
    // Internal Error
    res.sendStatus(500);
    return;
  }
});

app.get("/friends", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }

  let initialConnections = await prisma.friendConnection.findMany({
    where: {
      sendUserId: user.id,
    }
  });

  // Painful O(n) query, perfect for an attacker.
  // If we were cool, we would cache this result.
  const friends = await Promise.all(initialConnections.map(async (conn) => {
    let fullConnection = await prisma.friendConnection.findFirst({
      where: {
        OR: [
          { AND: { sendUserId: conn.recvUserId } },
          { AND: { recvUserId: user.id } },
        ]
      }
    });
    return [conn.recvUserId, fullConnection ? "full" : "sent_pending"];
  }));
  
  res.send({ friends });
});

app.get("/friends/status/:uid", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }
  
  try {
    let recvUserId = parseInt(req.params.uid);
    let status = null;

    // if I have sent a friend request to Other.
    let maybeSender = await prisma.friendConnection.findFirst({
      where: {
        OR: [
          { AND: { sendUserId: user.id } },
          { AND: { recvUserId: recvUserId } },
        ]
      }
    });

    if (maybeSender) {
      // If my request has been reciprocated.
      let maybeRecv = await prisma.friendConnection.findFirst({
        where: {
          OR: [
            { AND: { sendUserId: recvUserId } },
            { AND: { recvUserId: user.id } },
          ]
        }
      });
      
      if (maybeRecv) {
        status = "full";
      } else {
        status = "sent_pending";
      }
    }
    res.send({ status });
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }
});

app.get("/events/:id/comments/", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }

  // TODO: We need to ensure that the user is allowed to see these comments.

  try {
    const eventId = parseInt(req.params.id);
    const comments = await prisma.comment.findMany({
      where: {
        eventId,
      },
      include: {
        user: {
          select: {
            name: true
          }
        },
      }
    });

    res.send(comments);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
  }
});

app.post("/events/:id/comments/add", requiresAuth(), async (req, res) => {
  let user;
  try {
    user = await syncUser(req.oidc);
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
    return;
  }

  // TODO: We need to ensure that the user is allowed to add comments.
  
  try {
    const eventId = parseInt(req.params.id);
    console.log(eventId);
    await prisma.comment.create({
      data: {
        content: req.body.content,
        eventId,
        userId: user.id,
      }
    });
  } catch (e) {
    console.log(e);
    // Bad Request
    res.sendStatus(400);
  }
});

app.use(express.static("../dist"));

try {
  console.log("Now listening on port 3000");
  app.listen(3000);
} finally {
  await prisma.$disconnect();
}
