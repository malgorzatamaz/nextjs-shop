import { PrismaClient } from "@prisma/client";

import { items } from "../mocks/items";

const prisma = new PrismaClient();

async function init() {
  const itemsExists = (await prisma.product.count()) > 0;
  !itemsExists && (await prisma.product.createMany({ data: items }));
}

async function getAllItems() {
  const items = prisma.product.findMany();
  console.log(items);
  return await items;
}

const initDB = () => {
  init()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
};

const getItems = async () => {
  return await getAllItems();
  // .then(async () => {
  //   await prisma.$disconnect();
  // })
  // .catch(async (e) => {
  //   console.error(e);
  //   await prisma.$disconnect();
  //   process.exit(1);
  // });
};

const db = { initDB, getItems };

export default db;
