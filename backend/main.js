import express from "express";
import { PrismaClient } from './generated/prisma/index.js'

const app = express();
const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  await prisma.hello.create({
    data: {
      magic_word: "Hello World"
    }
  });
  res.send("Hello World");
});

app.use(express.static("../dist"))

try {
  console.log("Now listening on port 3000");
  app.listen(3000);
} finally {
  await prisma.$disconnect();
}
