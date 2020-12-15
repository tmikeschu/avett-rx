import Iron from "@hapi/iron";

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET ?? "";

export async function encrypt(data: Record<string, unknown>): Promise<string> {
  return data && Iron.seal(data, ENCRYPTION_SECRET, Iron.defaults);
}

export async function decrypt(data: string): Promise<Record<string, unknown>> {
  return data && Iron.unseal(data, ENCRYPTION_SECRET, Iron.defaults);
}
