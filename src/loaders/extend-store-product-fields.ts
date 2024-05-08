// export default async function () {
// 	const imports = (await import(
// 		"@medusajs/medusa/dist/api/routes/store/products/index"
// 	)) as any;
// 	imports.allowedStoreProductsRelations =
// 		[
// 			...imports.allowedStoreProductsRelations,
// 			"attribute_values",
// 			"attribute_values.attribute",
// 			"int_attribute_values",
// 			"int_attribute_values.attribute",
// 			"custom_attributes",
// 			"custom_attributes.values",
// 			"custom_attributes.int_values",
// 		];
// 	imports.defaultStoreProductsRelations =
// 		[
// 			...imports.defaultStoreProductsRelations,
// 		];
// }
