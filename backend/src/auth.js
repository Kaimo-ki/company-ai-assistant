// Auth helpers for the Cloudflare Worker backend.
// Password hashing uses Web Crypto PBKDF2 (no bcrypt on Workers).

const PBKDF2_ITERATIONS = 100000;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomHex(bytes = 16) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return toHex(arr.buffer);
}

// Derive a PBKDF2 hash (hex) from password + salt (hex).
export async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const salt = Uint8Array.from(saltHex.match(/.{2}/g).map((h) => parseInt(h, 16)));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return toHex(bits);
}

export function newSalt() {
  return randomHex(16);
}

// Constant-time-ish string compare.
export function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

// Create a session row and return the token.
export async function createSession(db, designerId) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  await db
    .prepare("INSERT INTO sessions (token, designer_id, expires_at) VALUES (?, ?, ?)")
    .bind(token, designerId, expiresAt)
    .run();
  return token;
}

// Hono middleware: validate Bearer token, attach designer to context.
export function requireAuth() {
  return async (c, next) => {
    const header = c.req.header("Authorization") || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return c.json({ error: "Не авторизован" }, 401);

    const session = await c.env.DB
      .prepare("SELECT designer_id, expires_at FROM sessions WHERE token = ?")
      .bind(token)
      .first();

    if (!session) return c.json({ error: "Не авторизован" }, 401);
    if (new Date(session.expires_at).getTime() < Date.now()) {
      await c.env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
      return c.json({ error: "Сессия истекла" }, 401);
    }

    const designer = await c.env.DB
      .prepare("SELECT id, name, email FROM designers WHERE id = ?")
      .bind(session.designer_id)
      .first();
    if (!designer) return c.json({ error: "Не авторизован" }, 401);

    c.set("designer", designer);
    c.set("token", token);
    await next();
  };
}
