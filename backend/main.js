import express from "express"
import { PrismaClient } from './generated/prisma/index.js'
import { auth } from "express-openid-connect"
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

// application/json parser
app.use(express.json());
app.use(auth(authConfig));

app.get("/", async (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.post("/createuser", async (req, res) => {
  if (!req.body) {
    // Bad Request
    res.sendStatus(400)
    return;
  }

  try {
    let now = new Date()
    await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        createDt: now,
        updateDt: now,
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

app.post("/createevent", async (req, res) => {
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
        userId: req.body.userId
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

app.use(express.static("../dist"));

try {
  console.log("Now listening on port 3000");
  app.listen(3000);
} finally {
  await prisma.$disconnect();
}
