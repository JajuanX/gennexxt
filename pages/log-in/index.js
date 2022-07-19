import React, { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import SimpleReactValidator from 'simple-react-validator';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import UserContext from '../../lib/context';
import styles from './Login.module.scss';
import Logo from '../../public/logo.jpeg';


export default function Login() {
	const {user, 
		setUserEmail,
		setUserPassword,
		userEmail,
		userPassword,
		signIn
	} = useContext(UserContext);
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

	const signInWithUserAndPassword = (e) => {
		e.preventDefault();
		if (!validator.current.allValid()) {
			validator.current.showMessages();
			return;
		}
		signIn()
			.then(() => {
				router.push('/admin');
			});
	}

	return (
		<div className={styles.loginPage}>
			<Toaster />
			<div className={styles.imageContainer}>
				<Image src={Logo} height={175} width={175} alt='Future 5 star' />
			</div>
			<div className={styles.container}>
				<h1>Log In</h1>
				<p>Welcome Back! log in below to create, and edit athletes</p>
				<form className={styles.signUpForm} onSubmit={(e) => signInWithUserAndPassword(e)}>
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
					<button className={styles.button} type='submit'>Log In</button>
				</form>
				<Link href='/login'>
					Not a Member?
				</Link>
			</div>
		</div>
	)
}
