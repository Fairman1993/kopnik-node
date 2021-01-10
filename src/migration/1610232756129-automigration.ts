import {MigrationInterface, QueryRunner} from "typeorm";

export class automigration1610232756129 implements MigrationInterface {
    name = 'automigration1610232756129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "foreman_request_chat_invite_link"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "foreman_request_chat_id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "patronymic" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."patronymic" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "birth_year" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."birth_year" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."birth_year" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "birth_year" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."patronymic" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "patronymic" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '5'`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "foreman_request_chat_id" bigint`);
        await queryRunner.query(`ALTER TABLE "users" ADD "foreman_request_chat_invite_link" character varying`);
    }

}
