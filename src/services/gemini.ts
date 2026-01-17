import { OccasionType, ToneType, type LanguageType } from '@/types'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

export const generateGreeting = async (
  occasion: OccasionType,
  name: string,
  age: string,
  interests: string,
  tone: ToneType,
  language: LanguageType,
): Promise<string> => {
  try {
    const prompt = `
      Напиши уникальное поздравление на языке: ${language}.

      Повод: ${occasion},
      Для кого: ${name},
      Возраст: ${age ? age : 'Не указан'},
      Интересы/хобби: ${interests ? interests : 'Не указаны'},
      Тон: ${tone}

      Инструкции по стилю (адаптируй под культурный контекст языка ${language}):
      - Официальный: Сдержанный, уважительный.
      - Дружеский: Теплый, неформальный.
      - Юмористический: Веселый, забавный, с доброй шуткой.
      - Романтический: Нежный, любящий, чувственный.
      - Трогательный: Душевный, эмоциональный.
      - 18+: Дерзкое, с перчинкой, сарказмом или взрослыми шутками. (Только если уместно для контекста 18+).

      Общие требования:
      - Обязательно учитывай возраст и интересы человека.
      - Длина: От 2 до 5 предложений.
      - Используй 2-3 подходящих по смыслу эмодзи.
      - Форматирование: Просто текст, без markdown заголовков.
      - Язык ответа СТРОГО: ${language}.
    `

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: tone === ToneType.ADULT ? 0.9 : 0.8,
      },
    })

    if (response.text) {
      return response.text
    } else {
      throw new Error('No text returned from AI model')
    }
  } catch (error) {
    console.error('Error generating greeting:', error)
    throw new Error('Failed to generate greeting')
  }
}
