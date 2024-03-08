import { AttributeService } from "../attribute"; // Adjust the import according to your file structure

describe("AttributeService", () => {
	let attributeService;
	let manager;
	let attributeRepository;
	let productCategoryRepository;
	let attributeValueRepository;

	beforeEach(() => {
		// Mock the dependencies
		manager = {
			withRepository: jest
				.fn()
				.mockImplementation((repo) => {
					if (
						repo === attributeRepository
					) {
						return attributeRepository;
					} else if (
						repo ===
						attributeValueRepository
					) {
						return attributeValueRepository;
					}
					throw new Error(
						"Repository not mocked"
					);
				}),
		};
		attributeRepository = {
			findOne: jest.fn(),
			save: jest.fn(),
			delete: jest.fn(),
		};
		productCategoryRepository = {}; // Mock this repository if necessary
		attributeValueRepository = {
			create: jest.fn(),
			save: jest.fn(),
			delete: jest.fn(),
		};

		// Create an instance of the service with the mocked dependencies
		attributeService =
			new AttributeService({
				manager,
				attributeRepository,
				productCategoryRepository,
				attributeValueRepository,
			});
	});

	describe("update method", () => {
		it("should update the attribute and its values correctly", async () => {
			const attributeId =
				"attr_01HQNEVD1Q2XQ3ZJYHEGAX8512";
			const updateData = {
				metadata: null,
				name: "Utilisation recommandée",
				description:
					"Running, yoga, randonnée, natation ... etc",
				handle:
					"utilisation-recommandee",
				categories: [
					"pcat_01H18X7NDTBN0MF3HJYF5J6ZXN",
					"pcat_01H18XAQK0G5SH9GENQAMT4FVC",
				],
				filterable: false,
				type: "multi",
				values: [
					{
						value: "Running",
						id: "attr_val_01HQNEVD1QF1NZ95ES1P1RZZQV",
						metadata: null,
						rank: 0,
					},
					{
						id: "attr_val_01HQNEVD1QF1NZ95ES1P1RZZQU",
						value: "Walking",
						metadata: null,
						rank: 1,
					},
				],
			};

			attributeRepository.findOne.mockResolvedValue(
				{
					id: attributeId,
					values: [
						{
							id: "attr_val_01HQNEVD1QF1NZ95ES1P1RZZQV",
							value: "Running",
						},
						{
							id: "attr_val_01HQNEVD1QF1NZ95ES1P1RZZYT",
							value: "jumping",
						},
					],
				}
			);

			attributeRepository.save.mockImplementation(
				(attr) => attr
			);
			attributeValueRepository.save.mockImplementation(
				(value) => value
			);

			await attributeService.update(
				attributeId,
				updateData
			);

			expect(
				attributeValueRepository.delete
			).toHaveBeenCalledWith([
				"attr_val_01HQNEVD1QF1NZ95ES1P1RZZYT",
			]);

			expect(
				attributeRepository.save
			).toHaveBeenCalledWith(
				expect.objectContaining({
					...updateData,
					id: attributeId,
					categories: [
						{
							id: "pcat_01H18X7NDTBN0MF3HJYF5J6ZXN",
						},
						{
							id: "pcat_01H18XAQK0G5SH9GENQAMT4FVC",
						},
					],
				})
			);
		});
	});
});
