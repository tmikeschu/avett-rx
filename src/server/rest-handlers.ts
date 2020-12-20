import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * Handles REST HTTP methods defined in `handlers`
 * as a dictionary of methods-to-functions.
 *
 * Errors are caught and returned.
 */

export const REST_METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE"] as const;

export type REST_METHOD = typeof REST_METHODS[number];
export function isRESTMethod(x: unknown): x is REST_METHOD {
  return typeof x === "string" && REST_METHODS.includes(x as REST_METHOD);
}

export function assertRESTMethod(x: unknown): asserts x is REST_METHOD {
  if (!isRESTMethod(x)) {
    throw new Error(`Invalid REST method: ${x}`);
  }
}

export function createHandlers(
  handlers: Partial<Record<REST_METHOD, NextApiHandler>>
) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    assertRESTMethod(req.method);

    const handler = handlers[req.method];
    if (handler) {
      try {
        await handler(req, res);
      } catch (err) {
        res.status(err.status || 500).end(err.message);
      }
    } else {
      res.setHeader("Allow", Object.keys(handlers));
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
}
