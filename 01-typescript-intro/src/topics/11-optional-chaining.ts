interface Passenger {
	name: string;
	children?: string[];
}

const passenger1: Passenger = {
	name: "Layla",
};

const passenger2: Passenger = {
	name: "Mort",
	children: ["Juan", "Pedro"],
};

const returnChildrenAmount = ({ name, children }: Passenger) => {
	const howManyChildren = children?.length ?? 0;
	console.log(`${name} tiene ${howManyChildren} hijos`);
};

returnChildrenAmount(passenger1);
returnChildrenAmount(passenger2);
