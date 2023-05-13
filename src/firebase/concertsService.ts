import {
	collection,
	CollectionReference,
	deleteDoc,
	doc,
	DocumentReference,
	getFirestore,
	setDoc,
	Timestamp
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export type Artist = {
	name: string;
	shortDescription: string;
	fullDescription: string;
	imageUrl: string;
};

export type Concert = {
	id?: string;
	artist: Artist;
	date: Timestamp;
	stage: string;
};

const db = getFirestore();

export const concertsCollection = collection(
	db,
	'concerts'
) as CollectionReference<Concert>;

export const concertDocument = (id: string) =>
	doc(db, 'concerts', id) as DocumentReference<Concert>;

export const createConcert = async (concert: Concert) => {
	concert.id = uuidv4();
	await setDoc(concertDocument(concert.id), concert);
};

export const deleteConcert = async (id: string) => {
	await deleteDoc(concertDocument(id));
};

export const editConcert = async (concert: Concert) => {
	await setDoc(concertDocument(concert.id!), concert);
};
