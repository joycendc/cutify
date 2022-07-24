import { NextApiResponse, NextApiRequest } from "next";
import initStripe from "stripe";
import { buffer } from "micro";
import { prisma } from "../../lib/prisma";

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      // const session = event.data.object;
      // const { line_items } = await stripe.checkout.sessions.retrieve(
      //   session.id,
      //   {
      //     expand: ["line_items"],
      //   }
      // );

      // console.log(session.id);
      // console.log(line_items);

      await prisma.user.update({
        where: { stripeCustomer: event.data.object.customer },
        data: {
          isSubscribed: true,
          interval: `${event.data.object.items.data[0].plan.interval_count} ${event.data.object.items.data[0].plan.interval}`,
        },
      });
      break;
    case "customer.subscription.deleted":
      await prisma.user.update({
        where: { stripeCustomer: event.data.object.customer },
        data: {
          isSubscribed: false,
          interval: null,
        },
      });
      break;
    default:
      break;
  }

  res.send({ received: true });
};

export default handler;
