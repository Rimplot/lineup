export type Genre = {
	name: string;
};

export const GenreDetails = {
	rock: { name: 'rock' },
	pop: { name: 'pop' },
	techno: { name: 'techno' },
	indie: { name: 'indie' }
};

export type Genres = keyof typeof GenreDetails;
