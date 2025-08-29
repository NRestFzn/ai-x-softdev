import { EduBotSystemPrompt } from '@/libs/constant/systemPromptTemplate'
import axios from 'axios'
import { GeminiApiResponseDto } from './dto'
import { env } from '@/config/env.config'

class ChatBotService {
  async publicAsk(question: string): Promise<GeminiApiResponseDto | null> {
    const requestBody = {
      systemInstruction: {
        parts: [{ text: EduBotSystemPrompt }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: question }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 1.0,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    }

    const axiosFetch = await axios.post(
      `${env.GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`,
      requestBody
    )

    const data: GeminiApiResponseDto = axiosFetch.data

    return data
  }
}

const chatBotService = new ChatBotService()

export default chatBotService
