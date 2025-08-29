import express, { Router } from 'express'
import { AuthController } from './controller/auth.controller'
import { ChatBotController } from './controller/chatbot.controller'

const Route: Router = express.Router()

Route.use('/auth', AuthController)
Route.use('/chatbot', ChatBotController)

export { Route as v1Route }
