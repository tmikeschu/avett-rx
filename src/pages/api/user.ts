// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler } from "next";

import { getSession } from "lib/iron";

const main: NextApiHandler = async (req, res) => {
  const session = await getSession(req);
  // After getting the session you may want to fetch for the user instead
  // of sending the session's payload directly, this example doesn't have a DB
  // so it won't matter in this case
  res.status(200).json({ user: session || null });
};

export default main;
