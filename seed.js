const { prisma } = require("./generated/prisma-client");

async function main() {
  await prisma.createUser({
    name: "John Doe",
    messages: {
      create: [{ body: "Hi" }, { body: "Bye" }]
    }
  });
  await prisma.createUser({
    name: "Jane Doe",
    messages: {
      create: [{ body: "Whats up" }, { body: "yolo" }]
    }
  });
}

main();
