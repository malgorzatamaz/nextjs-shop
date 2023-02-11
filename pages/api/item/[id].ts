import type { NextApiRequest, NextApiResponse } from "next/types";
import db from "prisma/db";
import { Item } from "types/Item";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item | { error: string }>
) {
  const id = req.query.id;

  if (!id || Array.isArray(id)) {
    res.status(400).json({ error: "wrong id provided" });
    return;
  }

  const item = await db.getItem(parseInt(id));

  item
    ? res.status(200).json(item)
    : res.status(404).json({ error: "item not found" });
}
