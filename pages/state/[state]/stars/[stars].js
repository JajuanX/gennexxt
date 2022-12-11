import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { Waypoint } from 'react-waypoint';
import axios from 'axios';
import toast from 'react-hot-toast';
import q from 'q';
import AthleteCard from '../../../../components/athlete-card/athleteCard';
import styles from './state.module.scss';
import starIcon from '../../../../public/star.min.svg'
import starOutlineIcon from '../../../../public/outline.svg'
import abbrState from '../../../../utils/abbrev-state/abbrev-state';
import IndexLayout from '../../../../layouts/IndexLayout';
import SearchByState from '../../../../components/search-state/searchByState';

function AthletesByState() {
	const router = useRouter();
	const {state, stars} = router.query;
	const starsRating = [1, 2 , 3, 4, 5];
	const [athletes, setAthletes] = useState([]);
	const [lastAthlete, setLastAthlete] = useState({});

	const getAllAthletesByStar = (selectedStar) => {
		setLastAthlete({});
		router.push(`/state/${state}/stars/${selectedStar}`)
	}

	const getAthleteByState = (last) => {
		const _deferred = q.defer();
		const errMsg = 'Fail to retrieve athletes by state'
		axios
			.post(`/api/state/${state}/${stars}`, last)
			.then(response => {
				_deferred.resolve(response.data)
			}).catch(error => {
				_deferred.reject(Object.assign(errMsg, error))
			})
		return _deferred.promise;
	}

	useEffect(() => {
		if(!state || !stars) return;
		getAthleteByState({})
			.then(response => {
				setAthletes(response)
			}).catch( () => {
				toast.error("Sorry no athlete matching that ID")
			})
	}, [state, stars])

	const nextPage = async () => {
		const last = athletes[athletes.length - 1] || {};
		if (Object.keys(last).length === 0) return;
		if (last === lastAthlete) return;
		getAthleteByState(last)
			.then(response => {
				setAthletes(prev =>([...prev, ...response]))
			}).catch( () => {
				toast.error("Sorry no athlete matching that ID")
			})
			.finally(() => {
				setLastAthlete(last)
			})
	}

	return (
		<div data-testid='business-page' className={styles.state}>
			<Head>
				<title>{stars} Star Athletes of - {state && abbrState(state, 'name')}</title>
				<meta name="description" content={`The state of ${state && abbrState(state, 'name')}`}/>
				<meta property="og:title" content={`5 Star Database state of ${state && abbrState(state, 'name')}`} />
				<meta property="og:description" content={`The state of ${state && abbrState(state, 'name')}`} />
				{/* <meta property="og:image" content={business?.cover_photo.url} /> */}
			</Head>
			<div className={styles.headerContainer}>
				<h1>{state && abbrState(state, 'name')} {stars} Stars </h1>
				<div className={styles.filtersContainer}>
					<h3>Filter By State</h3>
					<div className={styles.filterContainer}>
						<SearchByState />
						<div className={styles.starContainer}>
							{starsRating.map(star => (
								<button type='button' name={star} key={star} onClick={() => getAllAthletesByStar(star)} >
									{star <= stars ? <Image src={starIcon} height={20} width={20} alt='star' />:
										<Image src={starOutlineIcon} height={20} width={20} alt='star' />}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.athletesContainer}>
				{athletes?.length > 0 ? athletes.map(athlete => (
					<AthleteCard key={athlete.id} athlete={athlete} />
				)):
					<p>
						No Athletes Found
					</p>
				}
			</div>
			<div className={styles.waypoint}>
				<Waypoint onEnter={() => nextPage(athletes[athletes.length - 1])}/>
			</div>
		</div>
	)
}
AthletesByState.PageLayout = IndexLayout;

export default AthletesByState
