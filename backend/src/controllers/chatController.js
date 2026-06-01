const { AIInteraction } = require("../models");

exports.handleChat = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // TODO: In a real scenario, here we would call OpenAI API or Gemini API
    // const aiResponse = await callGemini(message);
    
    // Mocking the AI response based on the prompt
    let botReply = "Я пока нахожусь в режиме тестирования. Но я могу помочь вам подобрать краску!";
    
    if (message.toLowerCase().includes("морск")) {
      botReply = "Отличный выбор! Краска 'Морская волна' сейчас в наличии. Добавить её в корзину?";
    } else if (message.toLowerCase().includes("скидк") || message.toLowerCase().includes("дорого")) {
      botReply = "Я могу предложить вам скидку 10%. Используйте промокод START10 при оформлении заказа!";
    }

    // Log the interaction (ignoring foreign key constraints for mocking since userId might just be a telegram string ID)
    // In production, we'd ensure the user exists first.
    
    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error handling chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
