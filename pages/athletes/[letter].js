import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import toast from 'react-hot-toast';
import axios from 'axios';
import q from 'q';
import styles from './letter.module.scss';
import AthleteCard from '../../components/athlete-card/athleteCard';
import IndexLayout from '../../layouts/IndexLayout';
import SearchByAlpha from '../../components/search-alpha/searchByAlpha';
import { Waypoint } from 'react-waypoint';

function AthletesByLetter() {
	const router = useRouter();
	const {letter} = router.query;
	const [athletes, setAthletes] = useState([]);
    const [lastAthlete, setLastAthlete] = useState({});

	const getAthletesLetter = (last) => {
		const _deferred = q.defer();
		const errMsg = 'Fail to retrieve athletes by state'
		axios
			.get(`/api/athletes/alpha/${letter}`)
			.then(response => {
				_deferred.resolve(response.data)
			}).catch(error => {
				_deferred.reject(Object.assign(errMsg, error))
			})
		return _deferred.promise;
	}

    const postAthletesLetter = (last) => {
		const _deferred = q.defer();
		const errMsg = 'Fail to retrieve athletes by state'
		axios
			.post(`/api/athletes/alpha/${letter}`, last)
			.then(response => {
				_deferred.resolve(response.data)
			}).catch(error => {
				_deferred.reject(Object.assign(errMsg, error))
			})
		return _deferred.promise;
	}

    const nextPage = async () => {
		const last = athletes[athletes.length - 1] || {};
		if (Object.keys(last).length === 0) return;
		if (last === lastAthlete) return;
		postAthletesLetter(last)
			.then(response => {
				setAthletes(prev =>([...prev, ...response]))
			}).catch( () => {
				toast.error("Sorry no athlete matching that ID")
			})
			.finally(() => {
				setLastAthlete(last)
			})
	}

	useEffect(() => {
		if(!letter) return;
		getAthletesLetter(letter)
			.then(response => {
                setAthletes(response)
			}).catch( () => {
				toast.error("Sorry no athlete matching that ID")
			})
	}, [letter])

	return (
		<div className={styles.letter}>
			<Head>
				<title>Class of {letter}</title>
				<meta name="description" content={`The class of ${letter}`}/>
				<meta property="og:title" content={`5 Star Database class of ${letter}`} />
				<meta property="og:description" content={`The class of ${letter}`} />
				{/* <meta property="og:image" content={business?.cover_photo.url} /> */}
			</Head>
            <div className={styles.headerContainer}>
                <div>
                    <h1>Filter Athletes By Letter</h1>
                </div>
                <div className={styles.filtersContainer}>
                    <h3>Filter By First Name</h3>
                    <div className={styles.filterContainer}>
                        <SearchByAlpha selected={letter} />
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
AthletesByLetter.PageLayout = IndexLayout;

export default AthletesByLetter
