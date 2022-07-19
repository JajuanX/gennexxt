const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addAdminRole = functions.https.onCall(data => admin.auth().getUserByEmail(data.email)
	.then(user => admin.auth().setCustomUserClaims(user.uid, {
		admin: true,
	}))
	.then(() => ({
		message: `Success ${data.email} is now an admin`,
	}))
	.catch(err => err))

exports.addSuperAdminRole = functions.https.onCall(data => admin.auth().getUserByEmail(data.email)
	.then(user => admin.auth().setCustomUserClaims(user.uid, {
		super: true,
		admin: true,
	}))
	.then(() => ({
		message: `Success ${data.email} is now an admin`,
	}))
	.catch(err => err))