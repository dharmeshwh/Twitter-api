import { MigrationInterface, QueryRunner } from "typeorm";

export class Dy1703321470012 implements MigrationInterface {
  name = "Dy1703321470012";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_entity" DROP CONSTRAINT "FK_d70c7a343fe6225cbc67ef0f5a7"`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" DROP CONSTRAINT "FK_edb8ec397b0009b615ed1dad6c3"`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" DROP CONSTRAINT "UQ_edb8ec397b0009b615ed1dad6c3"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_entity" DROP CONSTRAINT "FK_d70c7a343fe6225cbc67ef0f5a7"`
    );
  }
}
