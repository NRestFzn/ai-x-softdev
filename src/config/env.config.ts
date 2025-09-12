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

  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_API_URL: process.env.GEMINI_API_URL,

  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '7d',

  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_POSRT || 5432,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DELETED_RECORD_PREFIX: process.env.DB_DELETED_RECORD_PREFIX,
  DB_POOL_SIZE: process.env.DB_POOL_SIZE,
  DB_CONNECT_TIMEOUT_IN_MS: process.env.DB_CONNECT_TIMEOUT_IN_MS,
}
