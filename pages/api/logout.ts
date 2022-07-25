import { NextApiResponse, NextApiRequest } from "next";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("CUTIFY_ACCESS_TOKEN", "none", {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 1000),
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};
