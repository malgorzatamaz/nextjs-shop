import type { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  db.initDB();
  const items = await db.getItems();
  res.status(200).json(items);
}
