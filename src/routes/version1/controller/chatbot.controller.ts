import asyncHandler from '@/helper/asyncHandler'
import HttpResponse from '@/libs/http/HttpResponse'
import chatBotService from '@/service/chatbot/service'
import express, { Request, Response } from 'express'

const route = express.Router()

route.get(
  '/public-ask',
  asyncHandler(async (req: Request, res: Response) => {
    const formData = req.getBody()

    const data = await chatBotService.publicAsk(formData.question)

    const httpResponse = HttpResponse.get({
      message: 'Success get data',
      data,
    })

    res.status(200).json(httpResponse)
  })
)

export { route as ChatBotController }
