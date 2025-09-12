import { IBaseEntity } from './base-entity.interface'

export interface IDocument extends IBaseEntity {
  id: string
  filename: string
  path: string
  ext: string
}
