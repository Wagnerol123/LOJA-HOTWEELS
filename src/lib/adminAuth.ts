import crypto from "node:crypto";

export const ADMIN_COOKIE_NAME = "admin_session";

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "universo-colecionavel-dev-secret";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "universo123";
}

export function createSessionToken(): string {
  return crypto.createHmac("sha256", getSecret()).update("admin-session").digest("hex");
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expected = createSessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
