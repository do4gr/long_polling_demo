import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// you can do stuff in the client constructor
// const prisma = new PrismaClient({
//   __internal: { enginePath: '/Users/matthias/repos/work/prisma-engine/target/debug/query-engine' }
// } as any )


// you can do middlewares on 
// prisma.$use


async function populate() {
  await prisma.simple.create({
    data: {
      id: 6,
      name: "Simple 1"
    }
  });
  await prisma.simple.create({
    data: {
      id: 7,
      name: "Simple 2"
    }
  });
}

async function test() {
  const s = (await prisma.simple.findMany({
    where: { name: {startsWith: "Simple"}} }
  ));
  
  console.log(s[1]);
  console.log(s[2]);
  
}

async function main() {
  populate();
  return test();
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.disconnect()
  })