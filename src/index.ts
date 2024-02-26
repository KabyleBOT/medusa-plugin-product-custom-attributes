import { Attribute } from "./models/attribute";
import { AttributeValue } from "./models/attribute-value";
import { IntAttributeValue } from "./models/int-attribute-value";

declare module "@medusajs/medusa/dist/models/product" {
	interface Product {
		int_attribute_values?: IntAttributeValue[];
		attribute_values?: AttributeValue[];
		custom_attributes?: CustomAttributeInProduct[];
	}
}

export type CustomAttributeInProduct =
	Omit<Attribute, "beforeInsert"> & {
		values?: AttributeValue[];
		value?: IntAttributeValue;
	};
