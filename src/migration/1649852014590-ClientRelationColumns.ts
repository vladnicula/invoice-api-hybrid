import {MigrationInterface, QueryRunner} from "typeorm";

export class ClientRelationColumns1649852014590 implements MigrationInterface {
    name = 'ClientRelationColumns1649852014590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_client_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_fa17b8d8f39addb0dec842c6dfc" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "client_entity"`);
        await queryRunner.query(`DROP TABLE "client_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_client_entity" RENAME TO "client_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_client_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "client_entity"`);
        await queryRunner.query(`DROP TABLE "client_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_client_entity" RENAME TO "client_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_client_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "client_entity"`);
        await queryRunner.query(`DROP TABLE "client_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_client_entity" RENAME TO "client_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_client_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_fa17b8d8f39addb0dec842c6dfc" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "client_entity"`);
        await queryRunner.query(`DROP TABLE "client_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_client_entity" RENAME TO "client_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_entity" RENAME TO "temporary_client_entity"`);
        await queryRunner.query(`CREATE TABLE "client_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "temporary_client_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_client_entity"`);
        await queryRunner.query(`ALTER TABLE "client_entity" RENAME TO "temporary_client_entity"`);
        await queryRunner.query(`CREATE TABLE "client_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "temporary_client_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_client_entity"`);
        await queryRunner.query(`ALTER TABLE "client_entity" RENAME TO "temporary_client_entity"`);
        await queryRunner.query(`CREATE TABLE "client_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_fa17b8d8f39addb0dec842c6dfc" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "temporary_client_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_client_entity"`);
        await queryRunner.query(`ALTER TABLE "client_entity" RENAME TO "temporary_client_entity"`);
        await queryRunner.query(`CREATE TABLE "client_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_fa17b8d8f39addb0dec842c6dfc" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "temporary_client_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_client_entity"`);
    }

}
