import nc from 'next-connect';
import { firestore } from '../../../lib/firebase';
import { collectIdsandDocs } from '../../../utils/utilities';

const getByStars = nc({
	onError: (err, req, res) => {
		res.status(500).end("Error getting all athletes by stars");
	}})
	.get(async (req,res) => {
		const [state] = req.query.state;
		console.log(state);
		if(state) {
			console.log('indside');
			const nextPage = 
			firestore
				.collection("athletes")
				.where('state', '==', `${state}`)
			const athletesRef = await nextPage.get()
			const results = athletesRef.docs.map(collectIdsandDocs);
			console.log(results);
			res.send(results);
		}
	})
	.post(async (req,res) => {
		const [state, stars] = req.query.state;
		const athlete = req.body;
		if(Object.keys(athlete).length === 0) {
			const nextPageRef = 
			firestore
				.collection("athletes")
				.where('state', '==', `${state}`)
				.where('stars', '==', `${stars}`)
				.limit(8)
			const athletes = await nextPageRef.get()
			const results = athletes.docs.map(collectIdsandDocs);
			res.send(results);
		}
		
		
		// get last doc reference first. 
		const athleteRef = firestore.collection('athletes').doc(athlete.id)
		const lastAthlete = await athleteRef.get();
		
		const nextPageRef = 
			firestore
				.collection("athletes")
				.where('state', '==', `${state}`)
				.where('stars', '==', `${stars}`)
				.startAfter(lastAthlete)
				.limit(8)
		const athletes = await nextPageRef.get()
		const results = athletes.docs.map(collectIdsandDocs);
		res.send(results);
	})
	
export default getByStars;