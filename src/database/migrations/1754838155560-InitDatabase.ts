import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDatabase1754838155560 implements MigrationInterface {
  name = 'InitDatabase1754838155560'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector;`)

    await queryRunner.query(`
      CREATE TABLE "documents" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "filename" text NOT NULL,
        "path" text NOT NULL,
        "ext" text NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_documents_id" PRIMARY KEY ("id")
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "documents"`)
  }
}
