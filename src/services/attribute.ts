import { TransactionBaseService } from "@medusajs/medusa";
import { MedusaError } from "medusa-core-utils";
import {
	EntityManager,
	FindManyOptions,
	FindOneOptions,
	In,
	IsNull,
} from "typeorm";
import { AdminPostAttributeReq } from "../api/attribute/create-attribute";
import { AdminListAttributesParams } from "../api/attribute/list-attributes";
import { Attribute } from "../models/attribute";
import { AttributeRepository } from "../repositories/attribute";
import AttributeValueRepository from "../repositories/attribute-value";
import ProductCategoryRepository from "../repositories/product-category";

type InjectedDependencies = {
	manager: EntityManager;
	attributeRepository: typeof AttributeRepository;
	productCategoryRepository: typeof ProductCategoryRepository;
	attributeValueRepository: typeof AttributeValueRepository;
};

export const defaultAttributeRelations =
	["values", "categories"];

class AttributeService extends TransactionBaseService {
	protected readonly attributeRepository_: typeof AttributeRepository;
	protected readonly productCategoryRepository_: typeof ProductCategoryRepository;
	protected readonly attributeValueRepository_: typeof AttributeValueRepository;

	constructor({
		attributeRepository,
		productCategoryRepository,
		attributeValueRepository,
	}: InjectedDependencies) {
		super(arguments[0]);
		this.attributeRepository_ =
			attributeRepository;
		this.productCategoryRepository_ =
			productCategoryRepository;
		this.attributeValueRepository_ =
			attributeValueRepository;
	}

	async create(
		data: AdminPostAttributeReq
	) {
		const attributeRepo =
			this.activeManager_.withRepository(
				this.attributeRepository_
			);

		const categories =
			data?.categories?.map((c) => ({
				id: c,
			})) ?? [];

		const attribute =
			attributeRepo.create({
				...data,
				categories,
			});

		const duplicate =
			await attributeRepo.findOne({
				where: {
					handle: attribute.handle,
				},
			});

		if (duplicate) {
			throw new MedusaError(
				MedusaError.Types.CONFLICT,
				`"Attribute" with handle ${duplicate.handle} already exists`
			);
		}

		return await attributeRepo.save(
			attribute
		);
	}

	async list(
		{
			categories,
		}: AdminListAttributesParams,
		defaultConfig: Pick<
			FindManyOptions<Attribute>,
			"select" | "where" | "relations"
		> = {}
	) {
		const attributeRepo =
			this.activeManager_.withRepository(
				this.attributeRepository_
			);

		const where =
			(defaultConfig.where as Omit<
				FindManyOptions<Attribute>["where"],
				"values"
			>) || {};

		const config: FindManyOptions<Attribute> =
			{
				relations:
					defaultAttributeRelations,
				order: {
					values: {
						rank: "ASC",
					},
				},
				...defaultConfig,
			};

		if (categories) {
			config.where = [
				{
					...where,
					categories: {
						handle: In(categories),
					},
				},
				{
					...where,
					categories: {
						id: IsNull(),
					},
				},
			];
		}

		const attributes =
			await attributeRepo.find(config);

		return attributes;
	}

	async retrieve(
		id: string,
		config?: Omit<
			FindOneOptions<Attribute>,
			"where"
		>
	) {
		const attributeRepo =
			this.activeManager_.withRepository(
				this.attributeRepository_
			);

		const attribute =
			await attributeRepo.findOne({
				where: { id },
				...config,
			});

		if (!attribute) {
			throw new MedusaError(
				MedusaError.Types.NOT_FOUND,
				`"Attribute" with id ${id} was not found`
			);
		}

		return attribute;
	}

	async update(
		id: string,
		data: Partial<AdminPostAttributeReq>
	) {
		const attributeRepo =
			this.activeManager_.withRepository(
				this.attributeRepository_
			);

		const attributeValueRepo =
			this.activeManager_.withRepository(
				this.attributeValueRepository_
			);

		const retrievedAttribute =
			await this.retrieve(id);

		if (!retrievedAttribute) {
			throw new MedusaError(
				MedusaError.Types.NOT_FOUND,
				`"Attribute" with id ${id} was not found`
			);
		}

		Object.keys(data).forEach(
			async (update) => {
				if (update === "categories") {
					const categories = data[
						update
					].map((c) => ({ id: c }));

					// @ts-ignore
					retrievedAttribute[
						"categories"
					] = categories;

					// delete data["categories"];
					return;
				}
				if (update === "values") {
					const newValues =
						data[update];

					const promisedValuesToUpdate =
						newValues?.map(
							async (v) => {
								if (!v?.id) {
									const createdValue =
										attributeValueRepo.create(
											{
												...v,
												attribute:
													retrievedAttribute,
											}
										);

									if (!createdValue) {
										throw new MedusaError(
											MedusaError.Types.NOT_FOUND,
											`Couldn't create "Attribute Value" with value ${v?.value}`
										);
									}

									return await attributeValueRepo.save(
										createdValue
									);
								}
								return v;
							}
						);

					const valuesToUpdate =
						await Promise.all(
							promisedValuesToUpdate
						);

					const oldValues =
						retrievedAttribute?.values ||
						[];

					const valuesToDelete =
						oldValues?.filter(
							(oldValue) =>
								!valuesToUpdate?.find(
									(valueToUpdate) =>
										valueToUpdate.id ===
										oldValue.id
								)
						);

					if (valuesToDelete?.length) {
						const ids =
							valuesToDelete?.map(
								(toDeleteValue) =>
									toDeleteValue?.id
							);

						console.log(
							"ids to delete",
							ids
						);

						await attributeValueRepo.delete(
							ids
						);
					}

					retrievedAttribute["values"] =
						valuesToUpdate;

					// delete data["values"];
					return;
				}

				retrievedAttribute[update] =
					data[update];
			}
		);

		return await attributeRepo.save(
			retrievedAttribute
		);
	}

	async delete(id: string) {
		const attributeRepo =
			this.activeManager_.withRepository(
				this.attributeRepository_
			);

		try {
			return await attributeRepo.delete(
				id
			);
		} catch (error) {
			throw new MedusaError(
				MedusaError.Types.DB_ERROR,
				`Failed to delete attribute with id: ${id}`
			);
		}
	}
}

export default AttributeService;
