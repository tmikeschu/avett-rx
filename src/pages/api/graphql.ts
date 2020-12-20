import { request } from "https";
import { RequestOptions } from "https";
import { getSession } from "server/auth-cookies";
import { createHandlers } from "server/rest-handlers";

const FAUNA_URL = new URL(process.env.NEXT_PUBLIC_FAUNA_GRAPHQL_URI ?? "");

// forward graphql requests to Fauna
export default createHandlers({
  POST: async (req, res) => {
    const session = await getSession(req);
    const faunaToken =
      session?.token ?? process.env.NEXT_PUBLIC_FAUNA_VISITOR_KEY;

    if (!faunaToken) throw new Error("No token for Fauna request");

    const options: RequestOptions = {
      host: FAUNA_URL.host,
      path: FAUNA_URL.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${faunaToken}`,
      },
    };

    const faunaReq = request(options, (faunaRes) => {
      faunaRes.setEncoding("utf8");

      if (faunaRes.statusCode) {
        res.writeHead(faunaRes.statusCode);
      }

      faunaRes.on("data", (chunk) => {
        res.write(chunk);
      });

      faunaRes.on("close", () => {
        res.end();
      });

      faunaRes.on("end", () => {
        res.end();
      });
    }).on("error", (e) => {
      throw e;
    });
    faunaReq.write(JSON.stringify(req.body));
    faunaReq.end();
  },
});
