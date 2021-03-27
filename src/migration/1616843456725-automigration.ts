import {MigrationInterface, QueryRunner} from "typeorm";

export class automigration1616843456725 implements MigrationInterface {
    name = 'automigration1616843456725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create extension if not exists cube`);
        await queryRunner.query(`create extension if not exists earthdistance`);
        await queryRunner.query(`ALTER TABLE "users" ADD "witness_radius" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "witness_radius"`);
    }

}
