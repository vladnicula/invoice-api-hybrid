import {MigrationInterface, QueryRunner} from "typeorm";

export class InvoiceRelationColumns1649851889008 implements MigrationInterface {
    name = 'InvoiceRelationColumns1649851889008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_invoice_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "dueDate" varchar NOT NULL, "items" varchar NOT NULL, "total" varchar NOT NULL, "userId" integer, "clientId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_invoice_entity"("id", "date", "dueDate", "items", "total", "userId", "clientId") SELECT "id", "date", "dueDate", "items", "total", "userId", "clientId" FROM "invoice_entity"`);
        await queryRunner.query(`DROP TABLE "invoice_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_invoice_entity" RENAME TO "invoice_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_invoice_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "dueDate" varchar NOT NULL, "items" varchar NOT NULL, "total" varchar NOT NULL, "userId" integer NOT NULL, "clientId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_invoice_entity"("id", "date", "dueDate", "items", "total", "userId", "clientId") SELECT "id", "date", "dueDate", "items", "total", "userId", "clientId" FROM "invoice_entity"`);
        await queryRunner.query(`DROP TABLE "invoice_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_invoice_entity" RENAME TO "invoice_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_invoice_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "dueDate" varchar NOT NULL, "items" varchar NOT NULL, "total" varchar NOT NULL, "userId" integer NOT NULL, "clientId" integer NOT NULL, CONSTRAINT "FK_421ca52ae746d23e37b3f49a432" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_5bd48b8ec417b31da9e9d0d7211" FOREIGN KEY ("clientId") REFERENCES "client_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_invoice_entity"("id", "date", "dueDate", "items", "total", "userId", "clientId") SELECT "id", "date", "dueDate", "items", "total", "userId", "clientId" FROM "invoice_entity"`);
        await queryRunner.query(`DROP TABLE "invoice_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_invoice_entity" RENAME TO "invoice_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_entity" RENAME TO "temporary_invoice_entity"`);
        await queryRunner.query(`CREATE TABLE "invoice_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "dueDate" varchar NOT NULL, "items" varchar NOT NULL, "total" varchar NOT NULL, "userId" integer NOT NULL, "clientId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "invoice_entity"("id", "date", "dueDate", "items", "total", "userId", "clientId") SELECT "id", "date", "dueDate", "items", "total", "userId", "clientId" FROM "temporary_invoice_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_invoice_entity"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" RENAME TO "temporary_invoice_entity"`);
        await queryRunner.query(`CREATE TABLE "invoice_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "dueDate" varchar NOT NULL, "items" varchar NOT NULL, "total" varchar NOT NULL, "userId" integer, "clientId" integer)`);
        await queryRunner.query(`INSERT INTO "invoice_entity"("id", "date", "dueDate", "items", "total", "userId", "clientId") SELECT "id", "date", "dueDate", "items", "total", "userId", "clientId" FROM "temporary_invoice_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_invoice_entity"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" RENAME TO "temporary_invoice_entity"`);
        await queryRunner.query(`CREATE TABLE "invoice_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "dueDate" varchar NOT NULL, "items" varchar NOT NULL, "total" varchar NOT NULL, "userId" integer, "clientId" integer, CONSTRAINT "FK_421ca52ae746d23e37b3f49a432" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "invoice_entity"("id", "date", "dueDate", "items", "total", "userId", "clientId") SELECT "id", "date", "dueDate", "items", "total", "userId", "clientId" FROM "temporary_invoice_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_invoice_entity"`);
    }

}
