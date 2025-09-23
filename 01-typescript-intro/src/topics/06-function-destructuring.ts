export interface Product {
	description: string;
	price: number;
}

// const phone: Product = {
// 	description: "Nokia Al",
// 	price: 150.0,
// };

// const tablet: Product = {
// 	description: "Samsung Galaxy Tab",
// 	price: 250.0,
// };

interface TaxCalculationOptions {
	tax: number;
	products: Product[];
}

// function taxCalculation(options: TaxCalculationOptions): [number, number] {
// function taxCalculation({ products, tax }: TaxCalculationOptions): [number, number] {

export function taxCalculation(options: TaxCalculationOptions): [number, number] {
	let total = 0;

	const { products, tax } = options;

	products.forEach(({ price }) => {
		total += price;
	});

	return [total, total * tax];
}

// const shoppingCart = [phone, tablet];
// const tax = 0.15;

// const [totalAmount, taxedAmount] = taxCalculation({
// 	tax: tax,
// 	products: shoppingCart,
// });

// console.log("Total: ", totalAmount);
// console.log("Tax: ", taxedAmount);
