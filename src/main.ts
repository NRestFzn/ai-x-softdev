import http from 'http'
import { App } from './config/app.config'
import { env } from './config/env.config'
import { httpHandle } from './libs/http/handle'
import { initConnection } from './config/firebase.config'

async function bootstrap() {
  const port = env.APP_PORT
  const app = new App().create
  const server = http.createServer(app)

  // initial database
  await initConnection()

  // http handle
  const { onError, onListening } = httpHandle(server, port)

  // run server listen
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
}

bootstrap()
