import 'dotenv/config'
import { validate } from '@/libs/validate'

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_PORT: validate.number(process.env.APP_PORT) || 8000,
  APP_NAME: process.env.APP_NAME || 'Express Sequelize Typescript',
  APP_URL: process.env.APP_URL || 'http://localhost:8000',
  APP_DEFAULT_PASS: process.env.APP_DEFAULT_PASS || 'yourpassword',

  FIRESTORE_TYPE: process.env.FIRESTORE_TYPE,
  FIRESTORE_PROJECT_ID: process.env.FIRESTORE_PROJECT_ID,
  FIRESTORE_PRIVATE_KEY_ID: process.env.FIRESTORE_PRIVATE_KEY_ID,
  FIRESTORE_PRIVATE_KEY:
    process.env.FIRESTORE_PRIVATE_KEY || 'yourfiresprivatetorekey',
  FIRESTORE_CLIENT_EMAIL: process.env.FIRESTORE_CLIENT_EMAIL,
  FIRESTORE_CLIENT_ID: process.env.FIRESTORE_CLIENT_ID,
  FIRESTORE_AUTH_URI: process.env.FIRESTORE_AUTH_URI,
  FIRESTORE_TOKEN_URI: process.env.FIRESTORE_TOKEN_URI,
  FIRESTORE_AUTH_PROVIDER: process.env.FIRESTORE_AUTH_PROVIDER,
  FIRESTORE_CERT_CLIENT: process.env.FIRESTORE_CERT_CLIENT,
  FIRESTORE_UNIVERSE_DOMAIN: process.env.FIRESTORE_UNIVERSE_DOMAIN,

  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '7d',
}
