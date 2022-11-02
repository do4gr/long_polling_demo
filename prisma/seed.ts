import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { username: "alice" },
    update: {},
    create: {
      username: "alice",
      chats: {
        create: {
          name: "PrismaNews",
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { username: "bob" },
    update: {},
    create: {
      username: "bob",
      chats: { connect: { name: "PrismaNews" } },
    },
  });

  await prisma.message.create({
    data: {
      content: "Hello World",
      chat: { connect: { name: "PrismaNews" } },
      author: { connect: { username: "alice" } },
    },
  });
  await prisma.message.create({
    data: {
      content: "Hello alice",
      chat: { connect: { name: "PrismaNews" } },
      author: { connect: { username: "bob" } },
    },
  });

  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
