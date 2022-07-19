import nc from 'next-connect';
import { firestore } from '../../../lib/firebase';

const getAthlete = nc({
	onError: (err, req, res) => {
		res.status(500).end("Sorry something went wrong", err);
	},
	onNoMatch: (req, res) => {
		res.status(404).end("Athlete not found");
	},
})
	.get(async (req,res) => {
		const {athleteID} = req.query;
		const athleteRef = await firestore.collection('athletes').doc(athleteID);
		const athlete = await athleteRef.get();
		if(!athlete.exists) {
			res.send('No matching documents.')
		}
		const athleteDetails = athlete.data();
		res.send(athleteDetails);
	})
	
export default getAthlete;