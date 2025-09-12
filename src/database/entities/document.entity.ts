import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from './base.entity'
import { IDocument } from './interfaces/document.interface'

@Entity('documents')
export class Document extends BaseEntity implements IDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  filename: string

  @Column({ type: 'text' })
  path: string

  @Column({ type: 'text' })
  ext: string
}
