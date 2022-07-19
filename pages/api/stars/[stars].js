import nc from 'next-connect';
import { firestore } from '../../../lib/firebase';
import { collectIdsandDocs } from '../../../utils/utilities';

const getByClass = nc({
	onError: (err, req, res) => {
		res.status(500).end("Error getting all athletes by stars", err);
	}})
	.post(async (req,res) => {
		const {stars} = req.query;
		const athlete = req.body;

		if(Object.keys(athlete).length === 0) {
			const nextPageRef = 
				firestore
					.collection("athletes")
					.where('stars', '==', `${stars}`)
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
				.where('stars', '==', `${stars}`)
				.startAfter(lastAthlete)
				.limit(8)
		const athletes = await nextPageRef.get()
		const results = athletes.docs.map(collectIdsandDocs);
		console.log(results);
		res.send(results);
	})
	
export default getByClass;