import { getSession, removeSession } from "server/auth-cookies";
import { magic } from "server/magic";
import { invalidateFaunaDBToken } from "server/models/user-model";
import { createHandlers } from "server/rest-handlers";

export default createHandlers({
  GET: async (req, res) => {
    const result = await getSession(req);
    const { issuer, token } = result as {
      issuer: string;
      token: string;
      email: string;
    };

    await Promise.all([
      magic.users.logoutByIssuer(issuer),
      invalidateFaunaDBToken(token),
    ]);

    removeSession(res);

    res.writeHead(302, { Location: "/" });
    res.end();
  },
});
