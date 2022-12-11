import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'
import { auth, createUserProfileDocument, storage, firestore } from './firebase';

// Custom hook to read auth record and user profile doc
function useUserData() {
	const [ user, setUser ] = useState({
		photoURL: '',
	});
	const [isAdmin, setIsAdmin] = useState(false)
	const [isSuper, setIsSuper] = useState(false)
	// const [ isLoading, setIsLoading ] = useState(false);
	// const [ userFavoriteBusinesses, setUserFavoriteBusinesses] = useState([])
	const [ userEmail, setUserEmail ] = useState('');
	const [ userPassword, setUserPassword ] = useState('');
	const router = useRouter()

	useEffect(() => {
		let unsubscribe;
		auth.onAuthStateChanged( async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth)
				unsubscribe = userRef.onSnapshot( async snapshot => {
					setUser({uid: snapshot.id, ...snapshot.data()});
				})
				userAuth.getIdTokenResult(true)
					.then(response =>{ 
						if(response.claims.admin) {
							setIsAdmin(true)
						}
						if(response.claims.super) setIsSuper(true)
					});
			} else {
				setUser(null);
			}
		})

		return unsubscribe;
	}, [])

	const handleUpload = (photo) => {
		const uploadTask = storage.ref(`images/${photo}`).put(photo);
		uploadTask.on(
			"state_changed",
			snapshot => {
				// const progress = Math.round(
				// 	( snapshot.bytesTransferred / snapshot.totalBytes) * 100
				// )
				console.log(snapshot);
			},
			error => {
				console.log(error);
			},
			() => {
				storage
					.ref("images")
					.child(photo)
					.getDownloadURL()
					.then(url => {
						setUser(val => ({...val, photoURL: url}));
					})
			}
		)
	}

	const uid = () => auth.currentUser.uid

	const handleSubmit = event => {
		event.preventDefault()
		const userRef = firestore.collection('users').doc(uid())
		userRef.update({displayName: user.displayName, email: user.email, photoURL: user.photoURL})
			.then(() => {
				toast.success('Successful Login');
			})
	}

	const handleChange = (event) => {
		setUser(val => ({...val, [event.target.name]: event.target.value}));
	}

	const handleUploadChange = async (event) => {
		event.preventDefault()
		if (event.target.files[0]){
			handleUpload(event.target.files[0]);
		}
	}

	const signUp = () => auth.createUserWithEmailAndPassword(userEmail, userPassword).then(userResponse => {
		createUserProfileDocument(user, {})
			.then(() =>{
				setUser({ userResponse })
				router.push('/admin');
			})
	})
	const signIn = () => auth.signInWithEmailAndPassword(userEmail, userPassword).then(userResponse => {
		createUserProfileDocument( user, {})
			.then(() => setUser({ userResponse }))
	})
	
	return { 
		user,
		handleUpload,
		handleUploadChange,
		handleChange,
		handleSubmit,
		signUp,
		signIn,
		setUserEmail,
		setUserPassword,
		userEmail,
		userPassword,
		isAdmin,
		isSuper,
	};
}

export default useUserData;
