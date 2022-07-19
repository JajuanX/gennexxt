import nc from 'next-connect';
import { firestore } from '../../../../lib/firebase';
import { collectIdsandDocs } from '../../../../utils/utilities';

const getByState = nc({
	onError: (err, req, res) => {
		res.status(500).end("Error getting all athletes by state");
	}})
	.get(async (req,res) => {
		const [state, stars, classYear] = req.query.state;

		const nextPage = 
			firestore
				.collection("athletes")
				.where('state', '==', `${state}`)
				.where('stars', '==', `${stars}`)
				.where('class', '==', `${classYear}`)
				.orderBy('name')
		const athletesRef = await nextPage.get()
		const results = athletesRef.docs.map(collectIdsandDocs);
		res.send(results);
	})
	
export default getByState;