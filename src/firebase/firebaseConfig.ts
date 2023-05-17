// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDfJZ87tAHjJ8W7vAR64cboZpmj1NXJeUo',
	authDomain: 'pv247-line-up.firebaseapp.com',
	projectId: 'pv247-line-up',
	storageBucket: 'pv247-line-up.appspot.com',
	messagingSenderId: '366173249550',
	appId: '1:366173249550:web:627e057ee1378327be9c5f'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
