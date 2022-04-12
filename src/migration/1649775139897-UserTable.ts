import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1649775139897 implements MigrationInterface {
    name = 'UserTable1649775139897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstName", "lastName", "isActive") SELECT "id", "firstName", "lastName", "isActive" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`INSERT INTO "user"("id", "firstName", "lastName", "isActive") SELECT "id", "firstName", "lastName", "isActive" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
