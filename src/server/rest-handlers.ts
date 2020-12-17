import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * Handles REST HTTP methods defined in `handlers`
 * as a dictionary of methods-to-functions.
 *
 * Errors are caught and returned.
 */
export function createHandlers(handlers: Record<string, NextApiHandler>) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const handler = req.method && handlers[req.method];
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
