import jwt from "jsonwebtoken";
import { NextApiResponse, NextApiRequest } from "next";
import initStripe from "stripe";
import { prisma } from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const token = req.cookies.CUTIFY_ACCESS_TOKEN;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

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

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomer,
      return_url: `${baseURL}/account`,
    });

    res.send({
      url: session.url,
    });
  } catch (error) {
    res.status(401);
    res.json({ error: error.message });
  }
};

export default handler;
