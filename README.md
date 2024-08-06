# Medusa Plugin Product Custom Attributes

### This plugin is based on [medusa-custom-attributes](https://github.com/vholik/medusa-custom-attributes) developped by [Rigby](https://www.linkedin.com/company/rigby-software).

The Medusa Plugin Product Custom Attributes is designed to enhance your e-commerce platform with custom attributes, providing compatibility with versions >= 1.20.0 of `@medusajs/medusa`.

## Features

1. **Diverse Attribute Types**: The plugin supports multi, single, range and boolean attributes, enabling a wide range of attribute customizations. 🤯
2. **Effortless Ranking**: Easily rank attribute values via a drag-and-drop interface in the admin panel. 🤌🏻
3. **Efficient Product Filtering**: Filter your products with ease by using these custom attributes. 💪
4. **Category-Based Attributes**: You can get attributes specific to particular categories, ensuring attribute relevance. 👀

## Getting Started

### Installation

To get started, install the Medusa Plugin Product Custom Attributes with either npm or yarn:

```bash
npm install medusa-plugin-product-custom-attributes
```

or

```bash
yarn add medusa-plugin-product-custom-attributes
```

(Optional) Next toggle categories feature flag to your .env:

```dotenv
MEDUSA_FF_PRODUCT_CATEGORIES=true
```

### Configuration

Next, add the plugin to your medusa-config.js file as follows:

```js
const plugins = [
	// ...
	{
		resolve: `medusa-plugin-product-custom-attributes`,
		options: {
			enableUI: true,
			projectConfig: {
				store_cors: STORE_CORS,
				admin_cors: ADMIN_CORS,
			},
		},
	},
];
```

And run migrations:

```bash
npx medusa migrations run
```

Now you're all set and ready to launch! 🚀
