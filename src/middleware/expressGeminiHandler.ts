import { isAxiosError } from 'axios'
import { red } from 'colorette'
import { Request, Response, NextFunction } from 'express'
import { logger } from '@/config/httplogger.config'

export default async function expressGeminiHandler(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const GEMINI_HOSTNAME = 'generativelanguage.googleapis.com'

  if (isAxiosError(err) && err.config?.url?.includes(GEMINI_HOSTNAME)) {
    const msgType = red('gemini-api')
    const message = err.response?.data?.error?.message || 'Gemini API error!'
    const statusCode = err.response?.status || 500

    logger.error(`${msgType} - ${message}`)

    const error = {
      code: statusCode,
      message,
      source: 'Gemini API',
      errors: err.response?.data?.error || null,
    }
    return res.status(statusCode).json(error)
  }

  next(err)
}
