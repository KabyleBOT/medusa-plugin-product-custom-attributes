import { Product as MedusaProduct } from "@medusajs/medusa";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import {
	// alias the core repository to not cause a naming conflict
	ProductRepository as MedusaProductRepository,
} from "@medusajs/medusa/dist/repositories/product";
import { Product } from "../models/product";

export const ProductRepository =
	dataSource
		.getRepository(Product)
		.extend(
			Object.assign(
				MedusaProductRepository,
				{
					target: MedusaProduct,
				}
			)
		);

export default ProductRepository;
