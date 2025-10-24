interface AudioPlayer {
	audioVolume: number;
	songDuration: number;
	song: string;
	details: Details;
}

interface Details {
	author: string;
	year: number;
}

const audioPlayer: AudioPlayer = {
	audioVolume: 90,
	songDuration: 36,
	song: "Walpurgis Night",
	details: {
		author: "Xomu",
		year: 2023,
	},
};

const song = "New Song";

const {
	song: aliasSong,
	songDuration: aliasDuration,
	details: { author },
} = audioPlayer;
// const { author } = details;

// console.log("Song: ", aliasSong);
// console.log("Duration: ", aliasDuration);
// console.log("Author: ", author);

const dbz: string[] = ["Goku", "Vegeta", "Trunks"];
// const trunks = dbz[3] || "Personaje inexistente";
// const [p1, p2, trunks] = dbz;
const [, , trunks = "Not found"] = dbz;

console.log("Personaje 3: ", trunks);

export {};
