// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import faunadb from "faunadb";
import { NextApiHandler } from "next";

import { setTokenCookie } from "lib/auth-cookies";
import { encryptSession } from "lib/iron";
import { magic } from "lib/magic";

const { query: q } = faunadb;
const client = new faunadb.Client({
  secret: process.env.FAUNA_LOGIN_KEY || "",
});

const main: NextApiHandler = async (req, res) => {
  try {
    const didToken = req.headers.authorization?.substr(7) || "";
    const metadata = await magic.users.getMetadataByToken(didToken);
    const faunaToken = (await client.query(
      q.Call("user_login_or_create", req.body.email, {})
    )) as { secret: string };
    const session = { ...metadata, faunaToken: faunaToken.secret };

    const token = await encryptSession(session);
    setTokenCookie(res, token);
    res.status(200).send({ done: true });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};

export default main;
