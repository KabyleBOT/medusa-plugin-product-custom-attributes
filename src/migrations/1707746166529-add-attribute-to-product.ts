import {
	MigrationInterface,
	QueryRunner,
} from "typeorm";

export class AddAttributeToProduct1707746166529
	implements MigrationInterface
{
	public async up(
		queryRunner: QueryRunner
	): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "product_attributes_attribute" (
                "productId" character varying,
                "attributeId" character varying
            );
        `);

		await queryRunner.query(`
            ALTER TABLE "product_attributes_attribute"
            ADD CONSTRAINT "FK_product_attributes_attribute_attribute" 
            FOREIGN KEY ("attributeId") 
            REFERENCES "attribute"("id") 
            ON DELETE CASCADE;
        `);

		await queryRunner.query(`
            ALTER TABLE "product_attributes_attribute"
            ADD CONSTRAINT "FK_product_attributes_attribute_product" 
            FOREIGN KEY ("productId") 
            REFERENCES "product"("id") 
            ON DELETE CASCADE;
        `);
	}

	public async down(
		queryRunner: QueryRunner
	): Promise<void> {
		await queryRunner.query(
			`DROP TABLE "product_attributes_attribute"`
		);
	}
}
