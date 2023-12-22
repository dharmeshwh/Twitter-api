import { MigrationInterface, QueryRunner } from "typeorm";

export class Dy1703232776998 implements MigrationInterface {
  name = "Dy1703232776998";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_profile_entity" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying(36) NOT NULL, "last_name" character varying(36) NOT NULL, "user_name" character varying(36) NOT NULL, "email" character varying(48) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_d19339adc41c1ab8833869dbdda" PRIMARY KEY ("uuid"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b0fa95205802648311e74b2c6b" ON "user_profile_entity" ("user_name") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4b8eaf409526a12181c9d86db7" ON "user_profile_entity" ("email") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4b8eaf409526a12181c9d86db7"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b0fa95205802648311e74b2c6b"`
    );
    await queryRunner.query(`DROP TABLE "user_profile_entity"`);
  }
}
