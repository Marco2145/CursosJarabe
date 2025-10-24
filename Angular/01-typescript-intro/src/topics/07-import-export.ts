import { taxCalculation, type Product } from "./06-function-destructuring";

const shoppingCart: Product[] = [
	{
		description: "Nokia",
		price: 150.0,
	},
	{
		description: "Alcatel",
		price: 100.0,
	},
];

const tax = 0.16;

const [totalAmount, taxedAmount] = taxCalculation({ tax: tax, products: shoppingCart });

console.log({ totalAmount, taxedAmount });
