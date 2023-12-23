import { MigrationInterface, QueryRunner } from "typeorm";

export class Dy1703264256858 implements MigrationInterface {
    name = 'Dy1703264256858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_entity" DROP COLUMN "user_uuid"`);
        await queryRunner.query(`ALTER TABLE "message_entity" ADD "user_uuid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message_entity" ADD CONSTRAINT "FK_d70c7a343fe6225cbc67ef0f5a7" FOREIGN KEY ("user_uuid") REFERENCES "user_profile_entity"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_d70c7a343fe6225cbc67ef0f5a7"`);
        await queryRunner.query(`ALTER TABLE "message_entity" DROP COLUMN "user_uuid"`);
        await queryRunner.query(`ALTER TABLE "message_entity" ADD "user_uuid" character varying NOT NULL`);
    }

}
