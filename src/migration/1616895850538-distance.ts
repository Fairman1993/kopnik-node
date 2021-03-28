import {MigrationInterface, QueryRunner} from "typeorm";

export class distance1616895850538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE FUNCTION distance(users, users) RETURNS float
        AS $$ select (point($1.longitude, $1.latitude) <@> point($2.longitude, $2.latitude)) / 0.62137 $$
        LANGUAGE SQL;
      `);
      await queryRunner.query(`
        CREATE FUNCTION distance(users, point) RETURNS float
        AS $$ select (point($1.longitude, $1.latitude) <@> $2) / 0.62137 $$
        LANGUAGE SQL;
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP FUNCTION  IF EXISTS distance`);
    }

}
