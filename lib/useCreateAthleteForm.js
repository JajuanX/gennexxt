import { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { useRouter } from 'next/router';
import { firestore, storage } from './firebase';
import {getImageDimensions} from '../utils/utilities'

const useCreateAthleteForm = () => {
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

	const handle_inputChange = (event) => {
		setAthlete(val => ({...val, [event.target.name]: event.target.value}));
	}

	const handle_submit = (user) => {
		if (!user) return;
		const { uid } = user;
		const updateAthleteRef = firestore.collection('athletes');

		updateAthleteRef.add({
			name: athlete.name || '',
			position: athlete.position || '',
			class: athlete.class || '',
			city: athlete.city || '',
			broad_leap: athlete.broad_leap || '',
			date: athlete.date || '',
			facebook: athlete.facebook || '',
			five_ten_five: athlete.five_ten_five || '',
			forty: athlete.forty || '',
			highlight: athlete.highlight || '',
			ig: athlete.ig || '',
			logo: athlete.logo || '',
			picture_link: athlete.picture_link || {},
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
				router.push(`/admin/search`)
			})
			.catch((error)=> {
				console.error(error);
			})
	}

	const handle_upload = (photo, fileName, targetName, imageDimensions) => {
		const uploadTask = storage.ref(`images/${fileName}`).put(photo);
		uploadTask.on(
			"state_changed",
			snapshot => {
				console.log(snapshot);
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
			}
		)
	}

	const handle_uploadChange = async (event) => {
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
						handle_upload(uri, fileName, targetName, imageDimensions)
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
		handle_uploadChange,
	};
}
export default useCreateAthleteForm;