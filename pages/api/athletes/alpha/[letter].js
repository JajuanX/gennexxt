import nc from 'next-connect';
import { collectIdsandDocs } from '../../../../utils/utilities';
import { firestore } from '../../../../lib/firebase';

const getAthletesByLetter = nc({
	onError: (err, req, res) => {
		res.status(501).end("Sorry something went wrong", err);
	},
	onNoMatch: (req, res) => {
		res.status(405).end("Method not found");
	},
})
	.get(async (req,res) => {
		const {letter} = req.query;
		try {
			const athletesRef = firestore.collection('athletes')
				.where('name', '>=', letter.toUpperCase())
				.where('name', '<=', `${letter.toUpperCase()}\uF7FF`)
				.limit(8)
			const athletes = await athletesRef.get();
			const athleteByLetter = athletes.docs.map(collectIdsandDocs);
			res.send(athleteByLetter);
		} catch(err) {
			res.send(err)
		}
	})
	.post(async (req,res) => {
		const {letter} = req.query;
		const athlete = req.body;
		
		if(Object.keys(athlete).length === 0) {
			const nextPageRef = 
				firestore
					.collection("athletes")
					.where('name', '>=', letter.toUpperCase())
					.where('name', '<=', `${letter.toUpperCase()}\uF7FF`)
					.limit(8)
			const athletes = await nextPageRef.get()
			const results = athletes.docs.map(collectIdsandDocs);
			res.send(results);
			return
		}
		// use doc ref as startAfter.
		const athleteRef = firestore.collection('athletes').doc(athlete.id)
		const lastAthlete = await athleteRef.get();
		
		const nextPageRef = 
			firestore
				.collection("athletes")
				.where('name', '>=', letter.toUpperCase())
				.where('name', '<=', `${letter.toUpperCase()}\uF7FF`)
				.startAfter(lastAthlete)
				.limit(8)
		const athletes = await nextPageRef.get()
		const results = athletes.docs.map(collectIdsandDocs);
		console.log(results);
		res.send(results);
	})
	
export default getAthletesByLetter;