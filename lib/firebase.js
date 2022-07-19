import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { GeoFirestore } from 'geofirestore';

const config = {
	apiKey: "AIzaSyDVyX1vFtuEKy4j1tPBRUNsRyI1irWkhQo",
	authDomain: "gennexxt-2e8e9.firebaseapp.com",
	databaseURL: "https://hometeam-891a3.firebaseio.com",
	projectId: "gennexxt-2e8e9",
	storageBucket: "gennexxt-2e8e9.appspot.com",
	messagingSenderId: "8407682962",
	appId: "1:8407682962:web:ef8b1b8f5fd331d7f63b4b",
	measurementId: "G-KBSG94V0TR"
} 

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}


export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const {FieldValue} = firebase.firestore;
export const provider = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();


export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithFacebook = () => auth.signInWithPopup(providerFacebook);

export const signOut = () => auth.signOut();

export const getUserDocument = async (uid) => {
	if (!uid) return null;
	try {
		return firestore.collection('users').doc(uid);
		
	} catch (error) { 
		console.error('Error fetching user', error.message);

	}
} 

export const createUserProfileDocument = async (user, additionalInfo) => {
	if (!user) return

	const { displayName, email, photoURL} = user; 	
	const userRef = firestore.doc( `users/${user.uid}`)
	const snapshot = await userRef.get()

	if (!snapshot.exists) {
		const createdAt = new Date();
		const favorites = [];
		const userBusinesses = [];
		try {
			await userRef.set({
				displayName,
				email,
				photoURL,
				createdAt,
				favorites,
				userBusinesses,
				...additionalInfo
			}).then(() => {
				firestore
					.collection("mail")
					.add({
						to: email,
						message: {
							subject: "Welcome to the Hometeam! (Beta)",
							html: "<h1>Thank you for signing up to the HomeTeam Beta program!</h1>" +
					"<p>A message from our founder/creator, Juan X." +
					`<br><br>Good Evening, ${displayName}!` +
					"<br><br>Let me extend a warm welcome to HomeTeam, and thank you for signing up to be apart of our Beta Program." +
					"<br><br>Here at Driven, we created HomeTeam app that provides an opportunity for Black and minority business owners to have a way to be discovered by local users without the barriers and extensive competitors that comes from other search engines such as: Yelp, Google, etc. " +
					"<br><br>The objective for this beta program is to receive feedback from a small sample of local  business owners that we trust." +
					"<br><br>Your feedback is imperative because  Hometeam constantly strives to improve the quality of our products and services to give an awesome experience to our consumers." +
					"<br><br>Follow this link to the <a href='https://forms.gle/bPT7JJ9kv3J6dgbe6'>survey</a> and let us know if this app actually benefits you, and how can we improve further. The survey is 2 minutes or less. The deadline to complete the survey is July 9th, 2021 at 11:59pm." +
					"<br><br>Thank you in advance for your valuable insights." +
					"<br><br>V/R" +
					"<br>Juan X</p>",
						},
					})
					.then(() => console.log("Queued email for delivery!"));
			})
		}

		catch (error) {
			console.error('Error creating user', error);
			
		}
	}
	
	return getUserDocument(user.uid)
}

export const isUserSubscribed = (user) => {
	if(!user) return
	const isSubscribed = firebase.auth().currentUser.getIdTokenResult()
		.then(idTokenResult => {
			console.log(idTokenResult);
			// Confirm the user is an Admin.
			if (idTokenResult.claims.admin) {
			// Show admin UI.
				return true;
			} 
			// Show regular user UI.
			console.log('no token', idTokenResult.claims.admin);
			return false;
		
		})
		.catch((error) => {
			console.log(error);
		});	
	return isSubscribed;
}

// Create a GeoCollection reference
export const geofirestore = new GeoFirestore(firestore);

export default firebase;
