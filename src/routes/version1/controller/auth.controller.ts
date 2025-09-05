import asyncHandler from '@/helper/asyncHandler'
import authService from '@/service/auth/service'
import HttpResponse from '@/libs/http/HttpResponse'
import express, { Response, Request } from 'express'
import { loginSchema, registerSchema } from '@/service/auth/schema'

const route = express.Router()

route.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    let values
    try {
      values = registerSchema.validateSync(req.body)
    } catch (schemaError: any) {
      res.status(422).json({
        success: false,
        message: 'Kesalahan validasi: ' + schemaError.message,
      })
      return
    }

    const data = await authService.signUp({ ...values })

    const httpResponse = HttpResponse.created({
      message: 'Pengguna berhasil terdaftar',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const values = loginSchema.validateSync(req.body)

    const data = await authService.signIn(values)

    const httpResponse = HttpResponse.get({
      message: 'Login berhasil',
      data,
    })

    res.status(200).json(httpResponse)
  })
)

export { route as AuthController }