import asyncHandler from '@/helper/asyncHandler'
import authService from '@/service/auth/service'
import HttpResponse from '@/libs/http/HttpResponse'
import express, { Response, Request } from 'express'
import { loginSchema, registerSchema } from '@/service/auth/schema'

const route = express.Router()

route.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const formData = req.getBody()

    const values = registerSchema.validateSync(formData)

    const data = await authService.signUp({ ...values })

    const httpResponse = HttpResponse.created({
      message: 'User registered successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const formData = req.getBody()

    const values = loginSchema.validateSync(formData)

    const data = await authService.signIn(values)

    const httpResponse = HttpResponse.get({
      message: 'Login successfully',
      data,
    })

    res.status(200).json(httpResponse)
  })
)

export { route as AuthController }
