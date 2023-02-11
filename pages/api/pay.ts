import type { NextApiRequest, NextApiResponse } from "next/types";
import { Item } from "types/Item";
import { BASE_URL } from "utils";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    name: "NextJSShop",
    version: "0.0.1",
    url: "https://github.com/malgorzatamaz/nextjs-shop",
  },
});

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const items = JSON.parse(req.body.items).map((item: Item) => ({
    price: item.stripePriceId,
    quantity: 1,
  }));

  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: "payment",
        success_url: `${BASE_URL}/order?success=true`,
        cancel_url: `${BASE_URL}/order?canceled=true`,
      });

      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
