import {
	collection,
	CollectionReference,
	deleteDoc,
	doc,
	DocumentReference,
	setDoc,
	Timestamp
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { Stages } from '../model/Stages';
import { Genres } from '../model/Genres';

import { db } from './firebaseConfig';

export type Artist = {
	name: string;
	shortDescription: string;
	fullDescription: string;
	imageUrl: string;
	genre: Genres;
};

export type Concert = {
	id?: string;
	artist: Artist;
	date: Timestamp;
	stage: Stages;
	headliner: boolean;
};

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

// Countdown
export type Deadline = {
	timestamp: Timestamp;
};

export const deadlineDocument = () =>
	doc(db, 'deadline', 'deadlineID') as DocumentReference<Deadline>;

export const setDeadline = async (deadline: Deadline) => {
	await setDoc(deadlineDocument(), deadline);
};
