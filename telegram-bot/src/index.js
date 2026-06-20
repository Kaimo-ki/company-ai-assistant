/**
 * Telegram survey bot (Cloudflare Worker + D1).
 *
 * Flow:
 *   1. Client scans a designer's QR code -> opens t.me/<bot>?start=<designerId>
 *   2. Bot validates the designer, starts a survey, stores progress in `bot_sessions`.
 *   3. On completion, the answers are saved as an `orders` row attributed to that designer.
 */

// Survey definition. `options` -> reply-keyboard choices; `contact` -> "share contact" button.
const QUESTIONS = [
  { key: "name", text: "Здравствуйте! Как вас зовут?" },
  { key: "phone", text: "Укажите телефон для связи 📞", contact: true },
  {
    key: "room_type",
    text: "Какой тип помещения?",
    options: ["Квартира", "Дом", "Офис", "Коммерческое"],
  },
  { key: "area", text: "Какая площадь окраски, м²?" },
  {
    key: "budget",
    text: "Ориентировочный бюджет?",
    options: ["до 50 000 ₽", "50 000–150 000 ₽", "от 150 000 ₽"],
  },
  { key: "comment", text: "Опишите пожелания: цвета, сроки, комментарий ✍️" },
];

function buildKeyboard(question) {
  if (question.contact) {
    return {
      keyboard: [[{ text: "📱 Поделиться контактом", request_contact: true }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    };
  }
  if (question.options) {
    return {
      keyboard: question.options.map((opt) => [{ text: opt }]),
      resize_keyboard: true,
      one_time_keyboard: true,
    };
  }
  return { remove_keyboard: true };
}

async function sendMessage(token, chatId, text, replyMarkup) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_markup: replyMarkup || { remove_keyboard: true },
    }),
  });
}

function askQuestion(token, chatId, step) {
  const q = QUESTIONS[step];
  return sendMessage(token, chatId, q.text, buildKeyboard(q));
}

async function handleStart(env, chatId, param) {
  const token = env.TELEGRAM_BOT_TOKEN;
  if (!param) {
    return sendMessage(
      token,
      chatId,
      "Чтобы оставить заявку, отсканируйте QR-код вашего дизайнера 🎨"
    );
  }

  const designer = await env.DB
    .prepare("SELECT id, name FROM designers WHERE id = ?")
    .bind(param)
    .first();
  if (!designer) {
    return sendMessage(token, chatId, "Дизайнер не найден. Проверьте QR-код 🙏");
  }

  await env.DB
    .prepare(
      `INSERT INTO bot_sessions (chat_id, designer_id, step, answers, updated_at)
       VALUES (?, ?, 0, '{}', CURRENT_TIMESTAMP)
       ON CONFLICT(chat_id) DO UPDATE SET
         designer_id = excluded.designer_id, step = 0, answers = '{}', updated_at = CURRENT_TIMESTAMP`
    )
    .bind(String(chatId), designer.id)
    .run();

  await sendMessage(
    token,
    chatId,
    `Вы оставляете заявку дизайнеру ${designer.name}. Ответьте на несколько вопросов 👇`
  );
  return askQuestion(token, chatId, 0);
}

async function handleAnswer(env, chatId, value) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const session = await env.DB
    .prepare("SELECT designer_id, step, answers FROM bot_sessions WHERE chat_id = ?")
    .bind(String(chatId))
    .first();

  if (!session) {
    return sendMessage(
      token,
      chatId,
      "Чтобы начать, отсканируйте QR-код дизайнера или нажмите /start."
    );
  }

  const answers = JSON.parse(session.answers || "{}");
  answers[QUESTIONS[session.step].key] = value;
  const nextStep = session.step + 1;

  if (nextStep < QUESTIONS.length) {
    await env.DB
      .prepare(
        "UPDATE bot_sessions SET step = ?, answers = ?, updated_at = CURRENT_TIMESTAMP WHERE chat_id = ?"
      )
      .bind(nextStep, JSON.stringify(answers), String(chatId))
      .run();
    return askQuestion(token, chatId, nextStep);
  }

  // Survey complete -> save the order and clear the session.
  await env.DB
    .prepare(
      `INSERT INTO orders
         (id, designer_id, client_name, client_phone, room_type, area, budget, comment, telegram_chat_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`
    )
    .bind(
      crypto.randomUUID(),
      session.designer_id,
      answers.name || null,
      answers.phone || null,
      answers.room_type || null,
      answers.area || null,
      answers.budget || null,
      answers.comment || null,
      String(chatId)
    )
    .run();

  await env.DB.prepare("DELETE FROM bot_sessions WHERE chat_id = ?").bind(String(chatId)).run();

  return sendMessage(
    token,
    chatId,
    "Спасибо! 🎉 Ваша заявка передана дизайнеру. Он свяжется с вами в ближайшее время."
  );
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Send a POST request", { status: 405 });
    }

    try {
      const update = await request.json();
      const message = update.message;
      if (!message) return new Response("OK", { status: 200 });

      const chatId = message.chat.id;
      const text = message.text || "";

      if (text.startsWith("/start")) {
        const param = text.split(/\s+/)[1];
        await handleStart(env, chatId, param);
      } else {
        // A shared contact arrives as message.contact, otherwise plain text.
        const value = message.contact?.phone_number || text;
        if (value) await handleAnswer(env, chatId, value);
      }

      return new Response("OK", { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response("Error", { status: 500 });
    }
  },
};
