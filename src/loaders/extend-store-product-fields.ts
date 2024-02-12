export default async function () {
	const imports = (await import(
		"@medusajs/medusa/dist/api/routes/store/products/index"
	)) as any;
	imports.allowedStoreProductsRelations =
		[
			...imports.allowedStoreProductsRelations,
			// "attribute_values",
			"attribute",
			// "attribute_values.attribute",
			"attribute.attribute_values",
			"int_attribute_values",
			// "int_attribute_values.attribute",
			"attribute.int_attribute_values",
		];
	imports.defaultStoreProductsRelations =
		[
			...imports.defaultStoreProductsRelations,
			// "attribute_values",
			"attribute",
			// "attribute_values.attribute",
			"attribute.attribute_values",
			"int_attribute_values",
			// "int_attribute_values.attribute",
			"attribute.int_attribute_values",
		];
}
