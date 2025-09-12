import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { env } from '@/config/env.config'
import { Document } from './entities/document.entity'

export const databaseConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: [Document],
  seeds: [`${__dirname}/seeds/*.seeder.ts`],
  // factories: ['src/infrastructures/databases/factories/*.ts'], //TODO: implement factories for seeding
  seedTracking: false,
  synchronize: false,
  logging: env.NODE_ENV === 'development',
  migrations: [`${__dirname}/migrations/*.ts`],
  namingStrategy: new SnakeNamingStrategy(),
  poolSize: Number(env.DB_POOL_SIZE),
  connectTimeoutMS: Number(env.DB_CONNECT_TIMEOUT_IN_MS),
}

const dataSource = new DataSource(databaseConfig)
export default dataSource
