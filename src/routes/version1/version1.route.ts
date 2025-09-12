import express, { Router } from 'express'
import { AuthController } from './controller/auth.controller'
import { ChatBotController } from './controller/chatbot.controller'
import { DocumentRouter } from './controller/document.controller'

const Route: Router = express.Router()

Route.use('/auth', AuthController)
Route.use('/chatbot', ChatBotController)
Route.use('/document', DocumentRouter)

export { Route as v1Route }
