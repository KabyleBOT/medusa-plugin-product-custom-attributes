export default async function () {
	const imports = (await import(
		"@medusajs/medusa/dist/api/routes/store/products/index"
	)) as any;
	imports.allowedStoreProductsFields = [
		...imports.allowedStoreProductsFields,
		"custom_attributes",
	];
	imports.allowedStoreProductsRelations =
		[
			...imports.allowedStoreProductsRelations,
			"attribute_values",
			"attribute_values.attribute",
			"int_attribute_values",
			"int_attribute_values.attribute",
		];
}
