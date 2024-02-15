import {
	MigrationInterface,
	QueryRunner,
} from "typeorm";

export class AddAttributeIdToIntAndDefaultAttributeValue1707958902389
	implements MigrationInterface
{
	public async up(
		queryRunner: QueryRunner
	): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attribute_value" ADD COLUMN "attribute_id" character varying`
		);

		await queryRunner.query(
			`ALTER TABLE "int_attribute_value" ADD COLUMN "attribute_id" character varying`
		);
	}

	public async down(
		queryRunner: QueryRunner
	): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attribute_value" DROP COLUMN "attribute_id"`
		);
		await queryRunner.query(
			`ALTER TABLE "int_attribute_value" DROP COLUMN "attribute_id"`
		);
	}
}
