import type { NextApiRequest, NextApiResponse } from "next/types";
import db from "prisma/db";
import { Item } from "types/Item";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item>
) {
  const id = req.query.id;

  // if (!id || Array.isArray(id)) {
  //   res.status(400).json({ error: "wrong id provided" });
  //   return;
  // }

  //@ts-ignore
  const item = await db.getItem(parseInt(id));
  //@ts-ignore
  res.status(200).json(item);
  // item ? res.status(200).json(item) : res.status(404).json("item not found");
}
