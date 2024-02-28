import { ProductService as MedusaProductService } from "@medusajs/medusa";
import ProductRepository from "../repositories/product";
import { UpdateProductInput } from "@medusajs/medusa/dist/types/product";
import AttributeValueRepository from "../repositories/attribute-value";
import IntAttributeValueRepository from "../repositories/int-attribute-value";

type InjectedDependencies = {
	productRepository: typeof ProductRepository;
	attributeValueRepository: typeof AttributeValueRepository;
	intAttributeValueRepository: typeof IntAttributeValueRepository;
};

class ProductService extends MedusaProductService {
	protected readonly productRepository_: typeof ProductRepository;
	protected readonly intAttributeValueRepository: typeof IntAttributeValueRepository;
	protected readonly attributeValueRepository_: typeof AttributeValueRepository;

	constructor(
		private readonly container: InjectedDependencies
	) {
		super(arguments[0]);
		this.productRepository_ =
			container.productRepository;
		this.attributeValueRepository_ =
			container.attributeValueRepository;
		this.intAttributeValueRepository =
			container.intAttributeValueRepository;
	}

	async update(
		productId: string,
		update: UpdateProductInput & {
			int_attribute_values?: Record<
				string,
				any
			>[];
		}
	) {
		const manager = this.activeManager_;
		const intAttributeValueRepo =
			manager.withRepository(
				this.intAttributeValueRepository
			);

		if (update.int_attribute_values) {
			update.int_attribute_values =
				update.int_attribute_values.map(
					(v) => {
						const toCreate =
							intAttributeValueRepo.create(
								{
									id: v.id,
									value: v.value,
									attribute: {
										id: v.attribute_id,
									},
								}
							);

						return toCreate;
					}
				);
		}

		const updatedProduct =
			await super.update(
				productId,
				update
			);

		return updatedProduct;
	}
}

export default ProductService;
