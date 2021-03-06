import jwt from "jsonwebtoken";
import { NextApiResponse, NextApiRequest } from "next";
import initStripe from "stripe";
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const token = req.cookies.CUTIFY_ACCESS_TOKEN;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
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
        success_url: `${baseURL}/success`,
        cancel_url: `${baseURL}/success`,
      });

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

export default handler;
