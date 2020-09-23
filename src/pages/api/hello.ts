// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler } from "next";

const main: NextApiHandler = (_req, res) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};

export default main;
