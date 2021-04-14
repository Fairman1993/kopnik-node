import {MigrationInterface, QueryRunner} from "typeorm";

export class automigration1618437512049 implements MigrationInterface {
    name = 'automigration1618437512049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "passport" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."passport" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."passport" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "passport" SET NOT NULL`);
    }

}
