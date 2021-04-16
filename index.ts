import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// you can do stuff in the client constructor
// const prisma = new PrismaClient({
//   __internal: { enginePath: '/Users/matthias/repos/work/prisma-engine/target/debug/query-engine' }
// } as any )

// you can do middlewares on
// prisma.$use

async function populate() {
  await prisma.a.create({
    data: {
      id: 1,
      name: "a1",
      a: "a",
      b: "b",
    },
  });

  await prisma.b.create({
    data: {
      a: "a",
      b: "b",
      A: { connect: { id: 1 } },
    },
  });
}

async function test() {
  const s = await prisma.a.findMany();

  console.log(s[0]);
}

async function main() {
  populate();
  return test();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect;
  });
