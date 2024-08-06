import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ProductRepository as MedusaProductRepository } from "@medusajs/medusa/dist/repositories/product";
import { Product } from "../models/product";

// Create a new repository instance for your custom Product model
export const ProductRepository =
	dataSource.getRepository(Product);

// Set the prototype of your custom repository to Medusa's ProductRepository
Object.setPrototypeOf(
	ProductRepository,
	MedusaProductRepository.prototype
);

export default ProductRepository;
