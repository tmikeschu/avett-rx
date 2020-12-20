import { createSession } from "server/auth-cookies";
import { magic } from "server/magic";
import { findOrCreateUserByEmail } from "server/models/user-model";
import { createHandlers } from "server/rest-handlers";

export default createHandlers({
  POST: async (req, res) => {
    const didToken = magic.utils.parseAuthorizationHeader(
      req.headers.authorization ?? ""
    );

    magic.token.validate(didToken);
    const { email, issuer } = await magic.users.getMetadataByToken(didToken);
    if (!email) throw new Error("no email for token");
    if (!issuer) throw new Error("no issuer for token");

    const user = await findOrCreateUserByEmail(email);
    if (!user) throw new Error(`unable to get user by ${email}`);

    await createSession(res, {
      token: user.secret,
      email,
      issuer,
      roles: user.data.roles,
      _id: user.data._id,
      _ts: user.data._ts,
    });

    res.status(200).send({ done: true });
  },
});
