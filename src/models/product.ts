import {
	Entity,
	JoinTable,
	ManyToMany,
} from "typeorm";
import { Product as MedusaProduct } from "@medusajs/medusa";
import { Attribute } from "./attribute";
import { AttributeValue } from "./attribute-value";
import { IntAttributeValue } from "./int-attribute-value";

@Entity()
export class Product extends MedusaProduct {
	@ManyToMany(() => Attribute)
	@JoinTable({
		name: "product_attributes_attribute", // name of the table that we created in the migration
		joinColumn: {
			name: "productId", // field that represents Product entity in the join table
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "attributeId", // field that represents Attribute entity in the join table
			referencedColumnName: "id",
		},
	})
	attributes: Attribute[];

	@ManyToMany(() => AttributeValue)
	@JoinTable()
	attribute_values: AttributeValue[];

	@ManyToMany(() => IntAttributeValue, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinTable({
		name: "int_attribute_values_products_product",
	})
	int_attribute_values: IntAttributeValue[];
}
