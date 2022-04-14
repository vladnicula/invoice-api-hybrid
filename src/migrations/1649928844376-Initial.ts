import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1649928844376 implements MigrationInterface {
    name = 'Initial1649928844376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" varchar PRIMARY KEY NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "company" text)`);
        await queryRunner.query(`CREATE TABLE "invoice_item_entity" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "price" float NOT NULL, "invoiceId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "invoice_entity" ("id" varchar PRIMARY KEY NOT NULL, "date" varchar NOT NULL, "dueDate" varchar NOT NULL, "total" integer NOT NULL, "userId" varchar NOT NULL, "clientId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "client_entity" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_invoice_item_entity" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "price" float NOT NULL, "invoiceId" varchar NOT NULL, CONSTRAINT "FK_440807a24ba1f079be090d2ed80" FOREIGN KEY ("invoiceId") REFERENCES "invoice_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_invoice_item_entity"("id", "description", "price", "invoiceId") SELECT "id", "description", "price", "invoiceId" FROM "invoice_item_entity"`);
        await queryRunner.query(`DROP TABLE "invoice_item_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_invoice_item_entity" RENAME TO "invoice_item_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_invoice_entity" ("id" varchar PRIMARY KEY NOT NULL, "date" varchar NOT NULL, "dueDate" varchar NOT NULL, "total" integer NOT NULL, "userId" varchar NOT NULL, "clientId" varchar NOT NULL, CONSTRAINT "FK_421ca52ae746d23e37b3f49a432" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_5bd48b8ec417b31da9e9d0d7211" FOREIGN KEY ("clientId") REFERENCES "client_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_invoice_entity"("id", "date", "dueDate", "total", "userId", "clientId") SELECT "id", "date", "dueDate", "total", "userId", "clientId" FROM "invoice_entity"`);
        await queryRunner.query(`DROP TABLE "invoice_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_invoice_entity" RENAME TO "invoice_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_client_entity" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" varchar NOT NULL, CONSTRAINT "FK_fa17b8d8f39addb0dec842c6dfc" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "client_entity"`);
        await queryRunner.query(`DROP TABLE "client_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_client_entity" RENAME TO "client_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_entity" RENAME TO "temporary_client_entity"`);
        await queryRunner.query(`CREATE TABLE "client_entity" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL, "userId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "client_entity"("id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId") SELECT "id", "name", "contactName", "contactEmail", "taxCode", "iban", "address", "userId" FROM "temporary_client_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_client_entity"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" RENAME TO "temporary_invoice_entity"`);
        await queryRunner.query(`CREATE TABLE "invoice_entity" ("id" varchar PRIMARY KEY NOT NULL, "date" varchar NOT NULL, "dueDate" varchar NOT NULL, "total" integer NOT NULL, "userId" varchar NOT NULL, "clientId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "invoice_entity"("id", "date", "dueDate", "total", "userId", "clientId") SELECT "id", "date", "dueDate", "total", "userId", "clientId" FROM "temporary_invoice_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_invoice_entity"`);
        await queryRunner.query(`ALTER TABLE "invoice_item_entity" RENAME TO "temporary_invoice_item_entity"`);
        await queryRunner.query(`CREATE TABLE "invoice_item_entity" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "price" float NOT NULL, "invoiceId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "invoice_item_entity"("id", "description", "price", "invoiceId") SELECT "id", "description", "price", "invoiceId" FROM "temporary_invoice_item_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_invoice_item_entity"`);
        await queryRunner.query(`DROP TABLE "client_entity"`);
        await queryRunner.query(`DROP TABLE "invoice_entity"`);
        await queryRunner.query(`DROP TABLE "invoice_item_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
