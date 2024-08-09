import { PrismaClient } from "@prisma/client";
import { tests } from "./tests";

const prisma = new PrismaClient();

const transfer = async () => {
  const records = tests.map((row) =>
    prisma.test.create({
      data: row,
    }),
  );

  return await prisma.$transaction(records);
};

const main = async () => {
  console.log(`Start seeding ...`);
  await transfer();
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
