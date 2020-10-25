import Iron from "@hapi/iron";
import { NextApiRequest } from "next";

import { getTokenCookie } from "./auth-cookies";
import { Any } from "./types";

// Use an environment variable here instead of a hardcoded value for production
const TOKEN_SECRET = "this-is-a-secret-value-with-at-least-32-characters";

export function encryptSession(session: Record<string, Any>): Promise<string> {
  return Iron.seal(session, TOKEN_SECRET, Iron.defaults);
}

export async function getSession(
  req: NextApiRequest
): Promise<Record<string, Any>> {
  const token = getTokenCookie(req);
  return token && Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
}
