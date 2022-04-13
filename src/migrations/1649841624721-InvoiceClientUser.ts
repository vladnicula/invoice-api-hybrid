import {MigrationInterface, QueryRunner} from "typeorm";

export class InvoiceClientUser1649841624721 implements MigrationInterface {
    name = 'InvoiceClientUser1649841624721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoice_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactName" varchar NOT NULL, "contactEmail" varchar NOT NULL, "taxCode" varchar NOT NULL, "iban" varchar NOT NULL, "address" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "invoice_entity"`);
    }

}
