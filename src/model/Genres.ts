export type Genre = {
	name: string;
	color: string;
};

export const GenreDetails: { [key: string]: Genre } = {
	rock: { name: 'Rock', color: '#c30e0e' },
	pop: { name: 'Pop', color: '#35880E' },
	techno: { name: 'Techno', color: '#9c27b0' },
	indie: { name: 'Indie', color: '#03A197' },
	edm: { name: 'EDM', color: '#0E4688' }
};

export type Genres = keyof typeof GenreDetails;
