import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1698722315515 implements MigrationInterface {
    name = 'Migration1698722315515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "lastmakkname" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "ddffdf" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "ddffdf"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastmakkname"`);
    }

}
