// Runtime configuration for the frontend.
// Override via Vite env vars (.env): VITE_API_URL, VITE_BOT_USERNAME.

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

// Telegram bot username WITHOUT the leading @ (filled in after creating the bot).
export const BOT_USERNAME = import.meta.env.VITE_BOT_USERNAME || "your_bot";
