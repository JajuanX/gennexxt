/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import IndexLayout from '../../layouts/IndexLayout';
import styles from './admin.module.scss';
import UserContext from '../../lib/context';
import { signOut } from '../../lib/firebase';

function AdminSearch() {
	const {user, isAdmin, isSuper} = useContext(UserContext);
	const [userEmail, setUserEmail] = useState('');
	const isFirstRender = useRef(true);
	const router = useRouter();
	const validator = useRef(new SimpleReactValidator());

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false; // toggle flag after first render/mounting
			return;
		}
		if (!user) {
			router.push('/sign-up')
		}
	}, [user]);

	const createAdmin = (e) => {
		e.preventDefault();
		axios
			.post(`https://us-central1-gennexxt-2e8e9.cloudfunctions.net/addAdminRole`, {
				data: {email: userEmail},
			})
			.then(response => {
				if(response.data?.result?.errorInfo){
					return toast.error('Error giving rights be sure email matches')
				}
				toast.success(`Admin rights given to ${userEmail}`);
			})
			.catch(() => {
				toast.error('Failed to call database. Contact admin')
			})
	}

	return (
		<div className={styles.admin}>
			<Toaster position="top-center"/>
			<h1>Admin Portal</h1>
			<p>	Welcome to the Future Five Star admin portal. Here you can create and edit athletes.
				Just search for the athlete by state, then edit! Additionally you have access to create Athletes
				by clicking the create button below. If you dont have access contact your administrator.
			</p>
			<div className={styles.buttonContainer}>
				{ isSuper &&
				<form onSubmit={createAdmin}>
					<div className={styles.inputContainer}>
						<label className="business-label" htmlFor="email">
							Give Admin Rights
						</label>
						<input
							id='email'
							className="input-single"
							placeholder="Enter email of potential admin"
							type="email"
							name="email"
							value={userEmail || ''}
							onChange={(e) => setUserEmail(e.target.value)}
							autoComplete="off"
							onBlur={() =>
								validator.current.showMessageFor('email')
							}
						/>
						{validator.current.message(
							'email',
							userEmail,
							'required|email'
						)}
					</div>
					<button type='submit'>Give Access</button>
				</form>
				}
				{isAdmin ? 
					<Link href='/admin/create'>
						<a>
							<button type='button'>
									Create Athlete
							</button>
						</a>
					</Link>: 
					<p>You currently do not have admin rights, to create or edit profiles. Please 
						contact your administrator.
					</p>
				}
				<button className={styles.logout} type='button' onClick={signOut}>Logout</button>
			</div>
		</div>
	)
}
AdminSearch.PageLayout = IndexLayout;

export default AdminSearch
