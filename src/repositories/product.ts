import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import {
	// alias the core repository to not cause a naming conflict
	ProductRepository as MedusaProductRepository,
} from "@medusajs/medusa/dist/repositories/product";
import { Product } from "../models/product";

export const ProductRepository =
	dataSource
		.getRepository(Product)
		.extend({
			// it is important to spread the existing repository here.
			//  Otherwise you will end up losing core properties
			...Object.assign(
				MedusaProductRepository,
				{
					target: Product,
				}
			),

			/**
			 * Here you can create your custom function
			 * For example
			 */
		});

export default ProductRepository;
