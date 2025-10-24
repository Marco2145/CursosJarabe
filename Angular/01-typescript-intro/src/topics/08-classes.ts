export class Person {
	// public name: string;
	// private address: string;

	// constructor(obj?: { name?: string; address?: string }) {
	// 	this.name = obj?.name ?? "default name";
	// 	this.address = obj?.address ?? "default address";
	// }

	constructor(
		public firstName: string,
		public lastName: string,
		private address: string = "No address"
	) {}
}

// export class Hero extends Person {
// 	constructor(public alterEgo: string, public age: number, public realName: string) {
// 		super(realName, "New York");
// 	}
// }

export class Hero {
	constructor(
		public alterEgo: string,
		public age: number,
		public realName: string,
		private person: Person
	) {}
}

const person = new Person("Tony", "Stark", "Newy York");
const ironman = new Hero("Ironman", 45.0, "Tony", person);

console.log(ironman);
