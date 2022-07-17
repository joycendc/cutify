import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.CUTIFY_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "key");
        user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!user) {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Unauthorized" });
        return;
      }
      return handler(req, res, user);
    }
    res.status(401);
    res.json({ error: "Unauthorized" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "key");
  return user;
};
