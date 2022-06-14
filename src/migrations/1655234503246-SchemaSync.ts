import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1655234503246 implements MigrationInterface {
  name = 'SchemaSync1655234503246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "recommendations" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" DROP COLUMN "recommendations"`,
    );
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
  }
}
