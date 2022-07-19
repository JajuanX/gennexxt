/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import React, { useEffect, useRef, useContext } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './create.module.scss';
import useCreateAthleteForm from '../../../lib/useCreateAthleteForm';
import UserContext from '../../../lib/context';
import IndexLayout from '../../../layouts/IndexLayout';
import { states } from '../../../utils/us-states';


function CreateAthlete() {
	const {
		handle_submit,
		handle_uploadChange,
		athlete,
		handle_inputChange
	} = useCreateAthleteForm();

	const { user, isAdmin } = useContext(UserContext);
	const router = useRouter();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false; // toggle flag after first render/mounting
			return;
		}

		if (!user) {
			router.push('/sign-up')
		}

		if (user && !isAdmin) {
			router.push('/admin')
		}
	}, [user]);

	const validator = useRef(new SimpleReactValidator());

	const submitAthlete = (event) => {
		event.preventDefault();
		if (!validator.current.allValid()) {
			validator.current.showMessages();
			console.log('ran');
			return;
		}
		handle_submit(user);
	};

	return (
		<>
			<Script
				strategy='beforeInteractive'
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY}&libraries=places`}
			/>
			<div
				className={styles.CreateAthlete}
				data-testid="create-business-page"
			>
				<h1 className={styles.mainTitle}>Add Athlete</h1>
				<form className="" onSubmit={(e) => submitAthlete(e)}>
					<div className={styles.inputContainer}>
						<label className="business-label" htmlFor="activated">
							Activate Athlete
						</label>
						<input
							id="activated"
							className="input-single"
							type="checkbox"
							name="activated"
							value={athlete.activated}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('activated')}
						/>
					</div>
					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="name">
							Name<span className={styles.required}> *</span>
						</label>
						<input
							id="name"
							className="input-single"
							placeholder="First and Last Name"
							type="text"
							name="name"
							value={athlete?.name || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('name')}
						/>
						{validator.current.message('name', athlete?.name, 'required')}
					</div>
					<div className={styles.inputContainer}>
						<Box sx={{ width: '90vw', margin: '24px auto' }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">State</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={athlete?.state}
									label="State"
									name='state'
									onChange={(e) => handle_inputChange(e)}
									MenuProps={MenuProps}
								>
									{states.map(state => (
										<MenuItem key={state[1]} value={state[1]}>
											{state[0]}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="city">
							City<span className={styles.required}> *</span>
						</label>
						<input
							id="city"
							className="input-single"
							placeholder="IE: Hollywood"
							type="text"
							name="city"
							value={athlete?.city || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('city')}
						/>
						{validator.current.message('city', athlete?.city, 'required')}
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="class">
							Class<span className={styles.required}> *</span>
						</label>
						<input
							id="class"
							className="input-single"
							placeholder="2031"
							type="text"
							name="class"
							value={athlete?.class || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('class')}
						/>
						{validator.current.message('class', athlete?.class, 'required')}
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="stars">
							Stars<span className={styles.required}> *</span>
						</label>
						<input
							id="stars"
							className="input-single"
							placeholder="IE: 5"
							type="number"
							name="stars"
							value={athlete?.stars || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('stars')}
						/>
						{validator.current.message('stars', athlete?.stars, 'required')}
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="position">
							Position<span className={styles.required}> *</span>
						</label>
						<input
							id="position"
							className="input-single"
							placeholder="IE: WR"
							type="text"
							name="position"
							value={athlete?.position || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('position')}
						/>
						{validator.current.message('position', athlete?.position, 'required')}
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="forty">
							Forty
						</label>
						<input
							id="forty"
							className="input-single"
							placeholder="IE: 4.47"
							type="text"
							name="forty"
							value={athlete?.forty || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
						/>
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="five_ten_five">
							5-10-5
						</label>
						<input
							id="five_ten_five"
							className="input-single"
							placeholder="IE: 5.7"
							type="text"
							name="five_ten_five"
							value={athlete?.five_ten_five || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
						/>
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="vertical_jump">
							Vertical Leap
						</label>
						<input
							id="vertical_jump"
							className="input-single"
							placeholder="IE: 7'8"
							type="text"
							name="vertical_jump"
							value={athlete?.vertical_jump || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('vertical_jump')}
						/>
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="broad_leap">
							Broad Jump
						</label>
						<input
							id="broad_leap"
							className="input-single"
							placeholder="IE: 8'11 "
							type="text"
							name="broad_leap"
							value={athlete?.broad_leap || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('broad_leap')}
						/>
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="store">
							Store
						</label>
						<input
							id="store"
							className="input-single"
							placeholder="IE: http://www.hometeam.co"
							type="url"
							name="store"
							value={athlete?.store || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('store')}
						/>
						{validator.current.message('store', athlete?.store, 'url')}
					</div>

					<div className={styles.inputContainer}>
						<label className="athlete-label" htmlFor="highlight">
							Highlight Video(YouTube Only, Video ID)
						</label>
						<input
							id="highlight"
							className="input-single"
							placeholder="IE: jSwmopsf2Ag"
							type="text"
							name="highlight"
							value={athlete?.highlight || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
							onBlur={() => validator.current.showMessageFor('highlight')}
						/>
					</div>

					<h1>Cover Photo</h1>
					<div className="w-full flex flex-col items-center mb-5 h-40">
						<div className="relative h-40 w-full">
							<label className={styles.photolabel}>
								{athlete?.picture_link.url ? (
									<div className={styles.coverPhotoContainer}>
										<Image
											layout="fill"
											objectFit="contain"
											src={athlete?.picture_link.url}
											alt="#"
										/>
									</div>
								) : (
									<div className={styles.placeholder}>
										<span>Select File</span>
									</div>
								)}
								<input
									className={styles.photoupload}
									name="picture_link"
									type="file"
									onChange={(e) => handle_uploadChange(e)}
									autoComplete="off"
									title=""
								/>
							</label>
						</div>
					</div>

					<h1>Logo</h1>
					<div className="w-full flex flex-col items-center mb-5 h-40">
						<div className="relative h-40 w-full">
							<label className={styles.photolabel}>
								{athlete?.logo.url ? (
									<div className={styles.coverPhotoContainer}>
										<Image
											layout="fill"
											objectFit="contain"
											src={athlete?.logo?.url}
											alt="#"
										/>
									</div>
								) : (
									<div className={styles.placeholder}>
										<span>Select File</span>
									</div>
								)}
								<input
									className={styles.photoupload}
									name="logo"
									type="file"
									onChange={(e) => handle_uploadChange(e)}
									autoComplete="off"
									title=""
								/>
							</label>
						</div>
					</div>


					<div className={styles.inputContainer}>
						<label className="business-label" htmlFor="twitter">
							Twitter
						</label>
						<input
							className="input-single"
							placeholder="IE: your_username"
							type="url"
							name="twitter"
							value={athlete?.twitter || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
						/>
					</div>

					<div className={styles.inputContainer}>
						<label className="business-label" htmlFor="facebook">
							Facebook
						</label>
						<input
							className="input-single"
							placeholder="IE: your_username"
							type="url"
							name="facebook"
							value={athlete?.facebook || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
						/>
					</div>

					<div className={styles.inputContainer}>
						<label className="business-label" htmlFor="ig">
							Instagram
						</label>
						<input
							id='ig'
							className="input-single"
							placeholder="IE: your_username"
							type="url"
							name="ig"
							value={athlete?.ig || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
						/>
					</div>

					<div className={styles.inputContainer}>
						<label className="business-label" htmlFor="tik_tok">
							Tik Tok
						</label>
						<input
							id='tik_tok'
							className="input-single"
							placeholder="IE: your_username"
							type="url"
							name="tik_tok"
							value={athlete?.tik_tok || ''}
							onChange={(e) => handle_inputChange(e)}
							autoComplete="off"
						/>
					</div>

					<button type="submit" className={styles.button}>
						Save Changes
					</button>
				</form>
			</div>
		</>
	);
}

CreateAthlete.PageLayout = IndexLayout;

export default CreateAthlete;
