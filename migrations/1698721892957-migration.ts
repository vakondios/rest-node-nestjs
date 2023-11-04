import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1698721892957 implements MigrationInterface {
    name = 'Migration1698721892957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "qweqweqw" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "qweqweqw"`);
    }

}
