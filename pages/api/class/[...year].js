import nc from 'next-connect';
import { firestore } from '../../../lib/firebase';
import { collectIdsandDocs } from '../../../utils/utilities';

const getByStars = nc({
	onError: (err, req, res) => {
		res.status(500).end("Error getting all athletes by stars");
	}})
	.post(async (req,res) => {
		const [classYear, stars] = req.query.year;
		const athlete = req.body;

		if(Object.keys(athlete).length === 0) {
			const nextPageRef = 
				firestore
					.collection("athletes")
					.where('class', '==', `${classYear}`)
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
				.where('class', '==', `${classYear}`)
				.where('stars', '==', `${stars}`)
				.startAfter(lastAthlete)
				.limit(8)
		const athletes = await nextPageRef.get()
		const results = athletes.docs.map(collectIdsandDocs);
		res.send(results);
	})
	
export default getByStars;