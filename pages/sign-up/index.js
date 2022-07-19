import React, { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import SimpleReactValidator from 'simple-react-validator';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import UserContext from '../../lib/context';
import styles from './sign-up.module.scss';
import Logo from '../../public/logo.jpeg';

export default function SignUp() {
	const {user, 
		setUserEmail,
		setUserPassword,
		userEmail,
		signUp,
		userPassword} = useContext(UserContext);
	const router = useRouter();
	const isFirstRender = useRef(true);
	const validator = useRef(new SimpleReactValidator());


	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false // toggle flag after first render/mounting
			return;
		}
		if (user) {
			router.push('/admin');
		}
	}, [user, router]);

	const signUpWithUserAndPassword = (e) => {
		e.preventDefault();
		if (!validator.current.allValid()) {
			validator.current.showMessages();
			return;
		}
		signUp()
			.then(() => {
				router.push('/admin');
			})
			.catch(() => {
				toast.error('This Email is already in use')
				setTimeout(() => {
					router.push('/log-in');
				}, "2500")
			});
	}

	return (
		<div className={styles.signUpPage}>
			<Toaster />
			<div className={styles.imageContainer}>
				<Image src={Logo} height={175} width={175} alt='Future 5 star' />
			</div>
			<div className={styles.container}>
				<h1>Sign Up</h1>
				<p>Welcome to the Generation Nexxt 5 star Database. This is a login portal for administration rights.
					If you are looking to add and edit athletes in the database your are in the right place. 
					We currenlty do not have a portal for any other access. If you would like access please email 
				<strong><a href='mailto:jmartin@gennexxt.com'> Josh Martin - jmartin@gennexxt.com</a></strong>
				</p>
				<form className={styles.signUpForm} onSubmit={(e) => signUpWithUserAndPassword(e)}>
					<div className={styles.inputsContainers}>
						<div className={styles.inputContainer}>
							<label className="business-label" htmlFor="email">
								Email
							</label>
							<input className='input-single'
								placeholder="IE: john.doe@gmail.com"
								type="email"
								name="email"
								value={userEmail}
								onChange={(e) => setUserEmail(e.target.value)}
								autoComplete="off"
								onBlur={() => validator.current.showMessageFor('email')}
							/>
							{validator.current.message(
								'email',
								userEmail,
								'required|email'
							)}
						</div>
						<div className={styles.inputContainer}>
							<label className="business-label" htmlFor="password">
								Password
							</label>
							<input className='input-single'
								placeholder="Enter a Password"
								type="password"
								name="password"
								value={userPassword}
								onChange={(e) => setUserPassword(e.target.value)}
								autoComplete="off"
								onBlur={() => validator.current.showMessageFor('password')}
							/>
							{validator.current.message(
								'password',
								userEmail,
								['required', {max: 20}, {min: 6}]
							)}
						</div>
					</div>
					<button className={styles.button} type='submit'>Sign Up</button>
				</form>
				<Link href='/log-in'>
					Already a Member
				</Link>
			</div>
		</div>
	)
}
