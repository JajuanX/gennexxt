import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import q from 'q';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Waypoint } from 'react-waypoint';
import AthleteCard from '../../components/athlete-card/athleteCard';
import styles from './stars.module.scss';
import starIcon from '../../public/star.min.svg'
import starOutlineIcon from '../../public/outline.svg'
import IndexLayout from '../../layouts/IndexLayout';

function AthletesByStars() {
	const router = useRouter();
	const starRating = router.query.stars;
	const stars = [1, 2 , 3, 4, 5];
	const [athletes, setAthletes] = useState([]);
	const [lastAthlete, setLastAthlete] = useState({});

	const onChangeStars = (rating) => {
		setLastAthlete({});
		Router.push(`/stars/${rating}`)
	}

	const getAthletesByStarRating = (rating, last) => {
		const _deferred = q.defer();
		const errMsg = 'Fail to retrieve athletes by state'
		axios
			.post(`/api/stars/${rating}`, last)
			.then(response => {
				_deferred.resolve(response.data)
			}).catch(error => {
				_deferred.reject(Object.assign(errMsg, error))
			})
		return _deferred.promise;
	}

	useEffect(() => {
		if(!starRating) return;
		getAthletesByStarRating(starRating, {})
			.then(response => {
				setAthletes(response)
			}).catch( () => {
				toast.error("Sorry no athlete matching that ID")
			})
	}, [ starRating])

	const nextPage = async () => {
		const last = athletes[athletes.length - 1] || {}
		if (Object.keys(last).length === 0) return;
		if (last === lastAthlete) return;
		getAthletesByStarRating(starRating, last)
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
		<div data-testid='business-page' className={styles.stars}>
			<Head>
				<title>Future {starRating} Star Athletes</title>
				<meta name="description" content={`Future ${starRating} Star Athletes`}/>
				<meta property="og:title" content={`Future ${starRating} Star Athletes`} />
				<meta property="og:description" content={`Future ${starRating} Star Athletes`} />
				{/* <meta property="og:image" content={business?.cover_photo.url} /> */}
			</Head>
			<div className={styles.headerContainer}>
				<h1>Future {starRating} Stars </h1>
				<div className={styles.filtersContainer}>
					<h3>Filter By Star Rating</h3>
					<div className={styles.filterContainer}>
						<div className={styles.starContainer}>
							{stars.map(star => (
								<button type='button' name={star} key={star} onClick={() => onChangeStars(star)} >
									{star <= starRating ? <Image src={starIcon} height={20} width={20} alt='star' />:
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
						There are no {starRating} star athletes
					</p>
				}
			</div>
			<div className={styles.waypoint}>
				<Waypoint onEnter={() => nextPage(athletes[athletes.length - 1])}/>
			</div>
		</div>
	)
}
AthletesByStars.PageLayout = IndexLayout;

export default AthletesByStars
