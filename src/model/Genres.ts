export type Genre = {
	name: string;
};

export const GenreDetails: { [key: string]: Genre } = {
	rock: { name: 'Rock' },
	pop: { name: 'Pop' },
	techno: { name: 'Techno' },
	indie: { name: 'Indie' },
	edm: { name: 'EDM' }
};

export type Genres = keyof typeof GenreDetails;
