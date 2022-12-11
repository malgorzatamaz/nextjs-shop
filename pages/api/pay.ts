import type { NextApiRequest, NextApiResponse } from "next/types";
import { Item } from "types/Item";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
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
  const items = req.body.items.map((item: Item) => ({
    price: item.stripePriceId,
    quantity: 1,
  }));

  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
      });

      // const paymentIntent = await stripe.paymentIntents.create({
      //   amount: 500,
      //   currency: "gbp",
      //   payment_method: "pm_card_visa",
      // });

      // console.log("session", paymentIntent);
      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
