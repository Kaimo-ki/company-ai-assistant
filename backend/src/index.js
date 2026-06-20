// «Центр красок» backend — Cloudflare Worker on Hono + D1.
// Provides designer auth (register/login/logout/me) and order listing.

import { Hono } from "hono";
import { cors } from "hono/cors";
import { hashPassword, newSalt, safeEqual, createSession, requireAuth } from "./auth.js";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.text("CENTER KRASOK AI BACKEND (Cloudflare Worker + D1)"));

// --- Auth ---

app.post("/api/auth/register", async (c) => {
  const { name, email, password } = await c.req.json().catch(() => ({}));
  if (!name || !email || !password) {
    return c.json({ error: "Укажите имя, email и пароль" }, 400);
  }

  const existing = await c.env.DB
    .prepare("SELECT id FROM designers WHERE email = ?")
    .bind(email.toLowerCase())
    .first();
  if (existing) return c.json({ error: "Дизайнер с таким email уже существует" }, 409);

  const id = crypto.randomUUID();
  const salt = newSalt();
  const passwordHash = await hashPassword(password, salt);

  await c.env.DB
    .prepare("INSERT INTO designers (id, name, email, password_hash, salt) VALUES (?, ?, ?, ?, ?)")
    .bind(id, name, email.toLowerCase(), passwordHash, salt)
    .run();

  const token = await createSession(c.env.DB, id);
  return c.json({ token, designer: { id, name, email: email.toLowerCase() } }, 201);
});

app.post("/api/auth/login", async (c) => {
  const { email, password } = await c.req.json().catch(() => ({}));
  if (!email || !password) return c.json({ error: "Укажите email и пароль" }, 400);

  const designer = await c.env.DB
    .prepare("SELECT id, name, email, password_hash, salt FROM designers WHERE email = ?")
    .bind(email.toLowerCase())
    .first();
  if (!designer) return c.json({ error: "Неверный email или пароль" }, 401);

  const candidate = await hashPassword(password, designer.salt);
  if (!safeEqual(candidate, designer.password_hash)) {
    return c.json({ error: "Неверный email или пароль" }, 401);
  }

  const token = await createSession(c.env.DB, designer.id);
  return c.json({
    token,
    designer: { id: designer.id, name: designer.name, email: designer.email },
  });
});

app.post("/api/auth/logout", requireAuth(), async (c) => {
  await c.env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(c.get("token")).run();
  return c.json({ ok: true });
});

app.get("/api/auth/me", requireAuth(), (c) => c.json({ designer: c.get("designer") }));

// --- Orders ---

app.get("/api/orders", requireAuth(), async (c) => {
  const designer = c.get("designer");
  const { results } = await c.env.DB
    .prepare(
      `SELECT id, client_name, client_phone, room_type, area, budget, comment, status, created_at
       FROM orders WHERE designer_id = ? ORDER BY created_at DESC`
    )
    .bind(designer.id)
    .all();
  return c.json({ orders: results || [] });
});

export default app;
