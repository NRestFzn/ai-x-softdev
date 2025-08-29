import express, { Router } from 'express'
import { AuthController } from './controller/auth.controller'

const Route: Router = express.Router()

Route.use('/auth', AuthController)

export { Route as v1Route }
