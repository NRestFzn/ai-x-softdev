import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  content: string

  @Column({
    type: 'text',
    transformer: {
      to: (value: number[]): string => `[${value.join(',')}]`,
      from: (value: string): number[] => JSON.parse(value),
    },
  })
  embedding: number[]
}
