import {
	collection,
	CollectionReference,
	getFirestore,
	Timestamp
} from 'firebase/firestore';

export type Artist = {
	name: string;
	shortDescription: string;
	fullDescription: string;
	imageUrl: string;
};

export type Concert = {
	artist: Artist;
	date: Timestamp;
	stage: string;
};

const db = getFirestore();

export const concertsCollection = collection(
	db,
	'concerts'
) as CollectionReference<Concert>;
