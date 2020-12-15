import { getSession } from "lib/auth-cookies";
import { createHandlers } from "lib/rest-handlers";

export default createHandlers({
  GET: async (req, res) => {
    const session = await getSession(req);

    if (session) {
      const { token: ignore, ...user } = session;
      res.status(200).json({ user });
    } else {
      res.status(200).json({ user: undefined });
    }
  },
});
