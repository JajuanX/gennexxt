import nc from 'next-connect';
import { firestore } from '../../../lib/firebase';
import { collectIdsandDocs } from '../../../utils/utilities';

const getAllAthletes = nc({
	onError: (err, req, res) => {
		res.status(500).end("Error getting all athletes");
	}})
	.get(async (req,res) => {
		const field = 'name';

		const athletesRef = firestore.collection("athletes").orderBy(field)
		const athletes = await athletesRef.get()

		const results = athletes.docs.map(collectIdsandDocs);
		res.send(results);
	})
	.post(async (req,res) => {
		const [pageSize, state] = req.query.pagesize;
		const field = 'name';
		const athlete = JSON.parse(req.body);

		if(athlete.length === 0) {
			const nextPage = firestore.collection("athletes").orderBy(field).limit(pageSize)
			const athletesRef = await nextPage.get()
			const results = athletesRef.docs.map(collectIdsandDocs);
			res.send(results);
			return
		}

		// get last doc reference first. 
		const businessRef = firestore.collection('athletes').doc(athlete.id)
		const lastBusiness = await businessRef.get();

		// use doc ref as startAfter.
		const nextPage = firestore.collection("athletes").where('state', '==', `${state}`).orderBy(field).startAfter(lastBusiness).limit(pageSize)
		const athletesRef = await nextPage.get()
		const results = athletesRef.docs.map(collectIdsandDocs);
		res.send(results);
	})
	
export default getAllAthletes;