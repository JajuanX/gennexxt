import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import toast from 'react-hot-toast';
import axios from 'axios';
import q from 'q';
import { Waypoint } from 'react-waypoint';
import styles from './class-year.module.scss';
import AthleteCard from '../../../../components/athlete-card/athleteCard';
import starIcon from '../../../../public/star.min.svg'
import starOutlineIcon from '../../../../public/outline.svg'
import SearchByClass from '../../../../components/search-class/searchByClass';
import IndexLayout from '../../../../layouts/IndexLayout';

function AthletesByClass() {
	const router = useRouter();
	const {classof, stars} = router.query;
	const starRating = [1, 2 , 3, 4, 5];
	const [athletes, setAthletes] = useState([]);
	const [lastAthlete, setLastAthlete] = useState({});

	const getAllAthletesByStar = (selectedStar) => {
		setLastAthlete({});
		router.push(`/classof/${classof}/stars/${selectedStar}`)
	}
	const getAthletesByClass = (rating, last) => {
		const _deferred = q.defer();
		const errMsg = 'Fail to retrieve athletes by state'
		axios
			.post(`/api/class/${classof}/${rating}`, last)
			.then(response => {
				_deferred.resolve(response.data)
			}).catch(error => {
				_deferred.reject(Object.assign(errMsg, error))
			})
		return _deferred.promise;
	}

	useEffect(() => {
		if(!classof || !stars) return;
		getAthletesByClass(stars, {})
			.then(response => {
				setAthletes(response)
			}).catch( () => {
				toast.error("Sorry no athlete matching that ID")
			})
	}, [classof, stars])

	const nextPage = async () => {
		const last = athletes[athletes.length - 1] || {};
		if (Object.keys(last).length === 0) return;
		if (last === lastAthlete) return;
		getAthletesByClass(stars, last)
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
		<div className={styles.classof}>
			<Head>
				<title>Class of {classof}</title>
				<meta name="description" content={`The class of ${classof}`}/>
				<meta property="og:title" content={`5 Star Database class of ${classof}`} />
				<meta property="og:description" content={`The class of ${classof}`} />
				{/* <meta property="og:image" content={business?.cover_photo.url} /> */}
			</Head>
			<div className={styles.headerContainer}>
				<h1>Class of {classof}</h1>
				<div className={styles.filtersContainer}>
					<h3>Filter by Class</h3>
					<div className={styles.filterContainer}>
						<SearchByClass classYear={classof} />
						<div className={styles.starContainer}>
							{starRating.map(star => (
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
					<p className='text-center'>
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
AthletesByClass.PageLayout = IndexLayout;

export default AthletesByClass
