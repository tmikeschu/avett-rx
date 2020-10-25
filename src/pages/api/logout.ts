import { NextApiHandler } from "next";

import { removeTokenCookie } from "lib/auth-cookies";
import { getSession } from "lib/iron";
import { magic } from "lib/magic";

const main: NextApiHandler = async (req, res) => {
  const session = await getSession(req);
  await magic.users.logoutByIssuer(session.issuer);
  removeTokenCookie(res);
  res.json({ success: true });
  res.end();
};

export default main;
