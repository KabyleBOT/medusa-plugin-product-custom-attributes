import {
	BeforeInsert,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
} from "typeorm";
import { generateEntityId } from "@medusajs/medusa";
import { BaseEntity } from "@medusajs/medusa";
import { Attribute } from "./attribute";
import { Product } from "./product";

@Entity()
export class IntAttributeValue extends BaseEntity {
	@Column({ type: "int" })
	value: number;

	@Column({ nullable: true })
	attribute_id: string;

	@ManyToMany(() => Product)
	@JoinTable()
	products: Product[];

	@ManyToOne(
		() => Attribute,
		(a) => a.int_values
	)
	attribute: Attribute;

	@BeforeInsert()
	private beforeInsert(): void {
		this.id = generateEntityId(
			this.id,
			"int_attr_val"
		);
		if (!this.attribute_id) {
			this.attribute_id =
				this.attribute.id;
		}
	}
}
