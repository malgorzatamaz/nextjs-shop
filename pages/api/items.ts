import type { NextApiRequest, NextApiResponse } from "next/types";
import db from "prisma/db";
import { Item } from "types/Item";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
  db.initDB();
  const items = await db.getItems();
  res.status(200).json(items);
}
