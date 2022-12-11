import { PrismaClient } from "@prisma/client";

import { items } from "../mocks/items";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const prisma = new PrismaClient();

async function init() {
  const itemsExists = (await prisma.product.count()) > 0;

  if (!itemsExists) {
    const products = await Promise.all(
      items.map(async (item) => {
        const product = await stripe.products.create({
          name: item.title,
          description: item.description,
        });
        console.log(Math.round(item.price * 100));

        const price = await stripe.prices.create({
          unit_amount: Math.round(item.price * 100),
          currency: "usd",
          product: product.id,
        });
        return {
          ...item,
          stripeProductId: product.id,
          stripePriceId: price.id,
        };
      })
    );
    await prisma.product.createMany({ data: products });
  }
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
  return await prisma.product.findMany();
  // .then(async () => {
  //   await prisma.$disconnect();
  // })
  // .catch(async (e) => {
  //   console.error(e);
  //   await prisma.$disconnect();
  //   process.exit(1);
  // });
};

const getItem = async (id: number) => {
  return await prisma.product.findFirst({ where: { id } });
  // .then(async () => {
  //   await prisma.$disconnect();
  // })
  // .catch(async (e) => {
  //   console.error(e);
  //   await prisma.$disconnect();
  //   process.exit(1);
  // });
};

const db = { initDB, getItems, getItem };

export default db;
