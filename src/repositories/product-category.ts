import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ProductCategoryRepository as MedusaProductCategoryRepository } from "@medusajs/medusa/dist/repositories/product-category";
import { ProductCategory } from "../models/product-category";

// see https://github.com/medusajs/medusa/issues/6139

export const ProductCategoryRepository =
	dataSource
		.getTreeRepository(ProductCategory)
		.extend(
			Object.assign(
				MedusaProductCategoryRepository,
				{ target: ProductCategory }
			)
		);

export default ProductCategoryRepository;
