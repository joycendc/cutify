import jwt from "jsonwebtoken";
import { NextApiResponse, NextApiRequest } from "next";
import initStripe from "stripe";
import { prisma } from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const token = req.cookies.CUTIFY_ACCESS_TOKEN;
  const { priceId } = req.query;

  try {
    let user;
    if (token) {
      const { id } = jwt.verify(token, "key");
      user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new Error("Unauthorized");
      }
    }

    const lineItems = [
      {
        price: priceId,
        quantity: 1,
      },
    ];

    try {
      const session = await stripe.checkout.sessions.create({
        customer: user.stripeCustomer,
        mode: "subscription",
        line_items: lineItems,
        success_url: "https://cutify-dev.vercel.app/success",
        cancel_url: "https://cutify-dev.vercel.app/success",
      });
      console.log("session", session);

      res.send({
        id: session.id,
      });
    } catch (err) {
      console.log("err", err);
      res.status(401);
      res.json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(401);
    res.json({ error: "Unauthorized" });
  }
};
