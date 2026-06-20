-- Cloudflare D1 schema for «Центр красок»
-- Designers, auth sessions, client orders, and Telegram survey progress.

-- Designers (authenticated users of the dashboard)
CREATE TABLE IF NOT EXISTS designers (
    id            TEXT PRIMARY KEY,            -- uuid
    name          TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,               -- PBKDF2 derived key (hex)
    salt          TEXT NOT NULL,               -- per-user salt (hex)
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Opaque auth tokens (Bearer)
CREATE TABLE IF NOT EXISTS sessions (
    token       TEXT PRIMARY KEY,              -- uuid
    designer_id TEXT NOT NULL,
    expires_at  DATETIME NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (designer_id) REFERENCES designers(id) ON DELETE CASCADE
);

-- Orders collected via the Telegram survey, attributed to a designer's QR code
CREATE TABLE IF NOT EXISTS orders (
    id               TEXT PRIMARY KEY,         -- uuid
    designer_id      TEXT NOT NULL,
    client_name      TEXT,
    client_phone     TEXT,
    room_type        TEXT,
    area             TEXT,
    budget           TEXT,
    comment          TEXT,
    telegram_chat_id TEXT,
    status           TEXT DEFAULT 'new',
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (designer_id) REFERENCES designers(id) ON DELETE CASCADE
);

-- In-progress survey state, one row per Telegram chat
CREATE TABLE IF NOT EXISTS bot_sessions (
    chat_id     TEXT PRIMARY KEY,
    designer_id TEXT NOT NULL,
    step        INTEGER NOT NULL DEFAULT 0,
    answers     TEXT NOT NULL DEFAULT '{}',    -- JSON
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_designer ON orders(designer_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
