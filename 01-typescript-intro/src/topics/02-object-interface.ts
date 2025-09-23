const skills: string[] = ["Bash", "Counter", "Healing"];

interface Character {
	name: string;
	hp: number;
	skills: string[];
	hometown?: string; // "?" significa que es opcional
}

const strider: Character = {
	name: "Strider",
	hp: 100,
	skills: ["Bash", "Counter"],
	hometown: "Saltillo",
};

console.table(strider);

export {};
