import { MigrationInterface, QueryRunner } from "typeorm";

export class Dy1703245526589 implements MigrationInterface {
    name = 'Dy1703245526589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "followers_entity" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_uuid" character varying NOT NULL, "follower_uuid" character varying NOT NULL, CONSTRAINT "PK_62291c90c71da67cde7562e3cf3" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "message_entity" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_uuid" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_726559729087c113cd4eea689b6" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "message_entity"`);
        await queryRunner.query(`DROP TABLE "followers_entity"`);
    }

}
