import { MigrationInterface, QueryRunner } from "typeorm";

export class Dy1703248708093 implements MigrationInterface {
  name = "Dy1703248708093";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "followers_entity" DROP COLUMN "user_uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" ADD "user_uuid" uuid NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" DROP COLUMN "follower_uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" ADD "follower_uuid" uuid NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" ADD CONSTRAINT "UQ_edb8ec397b0009b615ed1dad6c3" UNIQUE ("follower_uuid")`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" ADD CONSTRAINT "FK_edb8ec397b0009b615ed1dad6c3" FOREIGN KEY ("follower_uuid") REFERENCES "user_profile_entity"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "followers_entity" DROP CONSTRAINT "FK_edb8ec397b0009b615ed1dad6c3"`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" DROP CONSTRAINT "UQ_edb8ec397b0009b615ed1dad6c3"`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" DROP COLUMN "follower_uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" ADD "follower_uuid" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" DROP COLUMN "user_uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE "followers_entity" ADD "user_uuid" character varying NOT NULL`
    );
  }
}
