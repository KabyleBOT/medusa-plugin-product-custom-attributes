import { Router } from "express";
import bodyParser from "body-parser";
import { errorHandler } from "@medusajs/medusa";
import attributeRouter from "./attribute";
import { registerOverriddenValidators } from "@medusajs/medusa";
import { AdminPostProductsProductReq as MedusaAdminPostProductsProductReq } from "@medusajs/medusa/dist/api/routes/admin/products/update-product";
import { StoreGetProductsParams as MedusaStoreGetProductsParams } from "@medusajs/medusa/dist/api/routes/store/products/index";
import { Type } from "class-transformer";
import {
	ValidateNested,
	IsArray,
	IsString,
	IsOptional,
	IsNumber,
} from "class-validator";
import { IsValidIntAttributes } from "../util/validate-int-attributes";

export default function route(
	rootDirectory,
	options
): Router {
	const route = Router();

	route.use(bodyParser.json());
	route.use(errorHandler());
	route.use(
		bodyParser.urlencoded({
			extended: true,
		})
	);

	const storeCorsOptions = {
		origin:
			options.projectConfig.store_cors.split(
				","
			),
		credentials: true,
	};

	const adminCorsOptions = {
		origin:
			options.projectConfig.admin_cors.split(
				","
			),
		credentials: true,
	};

	attributeRouter(route, {
		storeCorsOptions,
		adminCorsOptions,
	});

	return route;
}

export class AdminAttributeValueReq {
	@IsString()
	id: string;
}

export class AdminIntAttributeValueReq {
	@IsOptional()
	id: string;

	@Type(() => Number)
	@IsNumber()
	value: number;

	@IsString()
	attribute_id: string;
}

export class AdminCustomAttributeReq {
	@IsString()
	id: string;

	@IsOptional()
	@Type(() => AdminIntAttributeValueReq)
	@ValidateNested({ each: true })
	@IsArray()
	int_values: AdminIntAttributeValueReq[];

	@IsOptional()
	@Type(() => AdminAttributeValueReq)
	@ValidateNested({ each: true })
	@IsArray()
	values: AdminAttributeValueReq[];
}

export class AdminPostProductsProductReq extends MedusaAdminPostProductsProductReq {
	@IsOptional()
	@Type(() => AdminIntAttributeValueReq)
	@ValidateNested({ each: true })
	@IsArray()
	int_attribute_values: AdminIntAttributeValueReq[];

	@IsOptional()
	@Type(() => AdminAttributeValueReq)
	@ValidateNested({ each: true })
	@IsArray()
	attribute_values: AdminAttributeValueReq[];

	@IsOptional()
	@Type(() => AdminCustomAttributeReq)
	@ValidateNested({ each: true })
	@IsArray()
	custom_attributes: AdminCustomAttributeReq[];
}

export type IntAttributeParam = Record<
	string,
	string[]
>;

export class StoreGetProductsParams extends MedusaStoreGetProductsParams {
	@IsOptional()
	@IsValidIntAttributes()
	int_attributes: IntAttributeParam;

	@IsOptional()
	@IsString({ each: true })
	attributes: string[];
}

registerOverriddenValidators(
	AdminPostProductsProductReq
);
registerOverriddenValidators(
	StoreGetProductsParams
);
