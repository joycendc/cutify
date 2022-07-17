import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(404);
    res.json({ error: "Invalid request!" });
    return;
  }
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      "key",
      { expiresIn: "1h" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("CUTIFY_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 1 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    delete user.password;
    res.json(user);
  } else {
    res.status(401);
    res.json({ error: "Invalid Credentials" });
  }
};
