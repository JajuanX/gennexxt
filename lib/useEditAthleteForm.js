import { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { firestore, storage } from './firebase';
import {getImageDimensions} from '../utils/utilities'

const useEditAthleteForm = () => {
	const [athlete, setAthlete] = useState({
		name: '',
		position: '',
		class: '',
		city: '',
		broad_leap: '',
		facebook: '',
		five_ten_five: '',
		forty: '',
		highlight: '',
		ig: '',
		logo: {
			url: '',
			height: '',
			width: '',
		},
		picture_link: {
			url: '',
			height: '',
			width: '',
		},
		stars: '',
		state: '',
		store: '',
		tik_tok: '',
		vertical_jump: '',
		activated: false,
	});
	const router = useRouter();

	const handle_getAthlete = response => {
		const athleteData = {
			name: response.name || '',
			position: response.position || '',
			class: response.class || '',
			city: response.city || '',
			broad_leap: response.broad_leap || '',
			facebook: response.facebook || '',
			five_ten_five: response.five_ten_five || '',
			forty: response.forty || '',
			highlight: response.highlight || '',
			ig: response.ig || '',
			logo: response.logo || {
				url: '',
				height: '',
				width: '',
			},
			picture_link: response.picture_link || {
				url: '',
				height: '',
				width: '',
			},
			stars: response.stars || '',
			state: response.state || '',
			store: response.store || '',
			tik_tok: response.tik_tok || '',
			twitter: response.twitter || '',
			vertical_jump: response.vertical_jump || '',
			activated: response.activated || false,
		}
		setAthlete(athleteData);
	}
	

	const handle_submit = (user, athleteId) => {
		if (!user) return;
		const { uid } = user;
		const updateAthleteRef = firestore.collection('athletes').doc(athleteId);

		updateAthleteRef.update({
			name: athlete.name || '',
			position: athlete.position.toUpperCase() || '',
			class: athlete.class || '',
			city: athlete.city || '',
			broad_leap: athlete.broad_leap || '',
			date: athlete.date || '',
			facebook: athlete.facebook || '',
			five_ten_five: athlete.five_ten_five || '',
			forty: athlete.forty || '',
			highlight: athlete.highlight || '',
			ig: athlete.ig || '',
			logo: athlete.logo || {
				url: '',
				height: '',
				width: '',
			},
			picture_link: athlete.picture_link || {
				url: '',
				height: '',
				width: '',
			},
			stars: athlete.stars || '',
			state: athlete.state || '',
			store: athlete.store || '',
			tik_tok: athlete.tik_tok || '',
			twitter: athlete.twitter || '',
			vertical_jump: athlete.vertical_jump || '',
			activated: athlete.activated || false,
			user: {
				uid
			},
		})
			.then(() => {
				if(athlete.activated){
					router.push(`/athlete/${athleteId}`)
				}
				toast.success('success');
			})
			.catch((error)=> {
				console.error(error);
			})
	}

	const handle_inputChange = (event) => {
		setAthlete(val => ({...val, [event.target.name]: event.target.value}));
	}

	const handle_upload = (photo, fileName, targetName, imageDimensions, athleteId) => {
		const updateAthleteRef = firestore.collection('athletes').doc(athleteId);
		const uploadTask = storage.ref(`images/${fileName}`).put(photo);
		uploadTask.on(
			"state_changed",
			snapshot => {
				const progression = Math.round(
					( snapshot.bytesTransferred / snapshot.totalBytes) * 100
				)
				console.log(progression);
			},
			error => {
				console.log(error);
			},
			() => {
				storage
					.ref("images")
					.child(fileName)
					.getDownloadURL()
					.then(url => {
						setAthlete(value => ({...value, [targetName]: {url, height: imageDimensions.height, width: imageDimensions.width}}));
						return url;
					})
					.then((url) => {
						updateAthleteRef.update({ [targetName] : {url, height: imageDimensions.height, width: imageDimensions.width}})
					})
			}
		)
	}

	const handle_uploadChange = async (event, id) => {
		event.preventDefault()
		const fileName = event.target.files[0].name;
		const targetName = event.target.name;	
		let imageDimensions = {};
		if (event.target.files[0]) {
			imageDimensions = await getImageDimensions(event.target.files[0]);
			try {
				Resizer.imageFileResizer(
					event.target.files[0],
					300,
					300,
					'JPEG',
					100,
					0,
					async (uri) => {
						handle_upload(uri, fileName, targetName, imageDimensions, id)
					},
					'blob',
					200,
					200,
				);
			} catch(err) {
				console.log(err)
			}
		}
	}

	return {
		handle_submit,
		handle_inputChange,
		athlete,
		handle_getAthlete,
		handle_uploadChange,
	};
}
export default useEditAthleteForm;