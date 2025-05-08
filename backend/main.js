import express from "express";
import { PrismaClient } from './generated/prisma/index.js'

const app = express();
const prisma = new PrismaClient();

// application/json parser
app.use(express.json());


app.get("/", async (req, res) => {
  res.send("There is nothing here.");
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
