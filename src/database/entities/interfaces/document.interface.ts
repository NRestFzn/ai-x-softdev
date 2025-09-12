import { IBaseEntity } from './base-entity.interface'

export interface IDocument extends IBaseEntity {
  id: string
  content: string
  embedding: number[]
}
