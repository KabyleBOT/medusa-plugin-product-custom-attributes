import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import {
	// alias the core repository to not cause a naming conflict
	ProductRepository as MedusaProductRepository,
} from "@medusajs/medusa/dist/repositories/product";
import { Product } from "../models/product";

// see https://github.com/medusajs/medusa/issues/6139

export const ProductRepository =
	dataSource
		.getRepository(Product)
		.extend(
			Object.assign(
				MedusaProductRepository,
				{
					target: Product,
				}
			)
		);

export default ProductRepository;
