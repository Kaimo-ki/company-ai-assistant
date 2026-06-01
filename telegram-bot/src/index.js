/**
 * Cloudflare Worker for Telegram Bot
 * Receives Webhooks from Telegram and forwards messages to the Backend API.
 */

export default {
  async fetch(request, env, ctx) {
    // Only accept POST requests
    if (request.method !== "POST") {
      return new Response("Send a POST request", { status: 405 });
    }

    try {
      const update = await request.json();

      // Process only text messages for now
      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text;

        // Forward to our Backend (Mocked URL for now, replace with env.BACKEND_URL in production)
        const backendUrl = env.BACKEND_URL || "http://localhost:3000"; 
        
        // Let's call the backend /api/chat endpoint
        const backendResponse = await fetch(`${backendUrl}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: chatId.toString(), // Use Telegram chat ID as user ID for the bot
            message: text
          })
        });

        const backendData = await backendResponse.json();
        const botReply = backendData.reply || "Извините, я не смог обработать ваш запрос.";

        // Send response back to Telegram
        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: botReply
          })
        });
      }

      // Return 200 OK so Telegram knows we received the update
      return new Response("OK", { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response("Error", { status: 500 });
    }
  }
};
