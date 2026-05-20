import asyncio
import os
from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

client = Groq(api_key=GROQ_API_KEY)

with open("company_info.txt", "r", encoding="utf-8") as file:
    company_info = file.read()

@dp.message(CommandStart())
async def start(message: Message):
    await message.answer("Здравствуйте! Я AI-ассистент компании Центр Красок #1. Задайте вопрос о компании.")

@dp.message()
async def chat(message: Message):
    user_message = message.text

    prompt = f"""
Ты AI-ассистент компании Центр Красок #1.

Отвечай только на основе информации ниже.
Не придумывай факты.
Если информации нет, ответь: "Извините, в моей базе нет информации по этому вопросу."

Информация о компании:
{company_info}

Вопрос пользователя:
{user_message}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "Ты вежливый AI-ассистент компании. Отвечай кратко и понятно."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )

        answer = response.choices[0].message.content
        await message.answer(answer)

    except Exception as e:
        await message.answer(f"Ошибка: {e}")

async def main():
    print("Бот запущен")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())