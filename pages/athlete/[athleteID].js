import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import axios from 'axios';
import toast from 'react-hot-toast';
import q from 'q';
import YouTube from 'react-youtube';
import styles from './athlete.module.scss';
import starIcon from '../../public/star-gold.min.svg';
import IndexLayout from '../../layouts/IndexLayout';
import instagram from '../../public/instagram.png';
import tiktok from '../../public/tiktok.png';
import twitter from '../../public/twitter.png';
import facebook from '../../public/facebook.png';
import shop from '../../public/shop.svg';

function AthleteByID() {
	const router = useRouter();
	const {athleteID} = router.query;
	const [athlete, setAthlete] = useState([]);
	const opts = {
		height: '390',
		width: '100%',
		margin: '0 auto',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
		},
	};
	
	const getAllAthleteByID = (id) => {
		const _deferred = q.defer();
		const errMsg = 'Fail to retrieve business'
	
		axios
			.get(`/api/athlete/${id}`)
			.then(response => {
				_deferred.resolve(response.data)
			}).catch( error => {
				_deferred.reject(Object.assign(errMsg, error))
			})
		return _deferred.promise;
	}

	useEffect(() => {
		if(!athleteID) return;

		getAllAthleteByID(athleteID)
			.then(response => {
				setAthlete(response)
				console.log(response);
			}).catch( error => {
				toast.error("Sorry no athlete matching that ID")
				console.log(error);
			})
	}, [athleteID])

	return (
		<div data-testid='business-page' className={styles.athlete}>
			<Head>
				<title>{athlete.name} - {athlete?.stars} Star Athlete</title>
				<meta name="description" content={`${athlete.name} - ${athlete?.stars} Star Athlete`}/>
				<meta property="og:title" content={`${athlete.name} - ${athlete?.stars} Star Athlete`} />
				<meta property="og:description" content={`${athlete.name} - ${athlete?.stars} Star Athlete`} />
				<meta property="og:image" content={athlete?.picture_link?.url} />
			</Head>
			<div className={styles.imageContainer}> 
				{ athlete.picture_link &&
					<Image alt='athlete'
						style={{zIndex: '1'}}
						src={athlete?.picture_link?.url}
						height={athlete?.picture_link?.height}
						width={athlete?.picture_link?.width}
						objectFit='contain'
					/>
				}
			</div>
			<div className={styles.playerContainer}>
				<div className={styles.starsContainer}>
					{ athlete?.stars &&
						Array.from(Array(Number(athlete?.stars)).keys()).map((star) => (
							<div className={styles.star} key={star}>
								<Image src={starIcon} height={30} width={30} alt='star' />
							</div>
						))
					}
				</div>

				{ athlete?.name ? <div className={styles.infoContainer}>
					<div className={styles.titleContainer}>
						<div className={`${styles.left} truncate ...`}>
							<span className={styles.name}>{athlete.name}</span>
						</div>
						<span className={styles.position}>{athlete.position}</span>
					</div>
					<div className={styles.stateYearContainer}>
						<div className={styles.location}>{athlete.city}, {athlete.state}</div>
						<div className={styles.classYear}>{athlete.class}</div>
					</div>
				</div> : null}

				{ athlete?.forty || athlete?.vertical_jump || athlete?.broad_leap || athlete?.five_ten_five ? 
				<div className={styles.playerProfile}>
					<h2>Player Profile</h2>
					<div className={styles.attributesContainer}>
						{athlete?.forty &&
							<div className={styles.attributeContainer}>
								<div className={styles.attributeTitle}>40yd Dash</div>
								<span className={styles.attribute}>{athlete?.forty}</span>
							</div>
						}
						{athlete?.vertical_jump &&
							<div className={styles.attributeContainer}>
								<div className={styles.attributeTitle}>Vertical</div>
								<span className={styles.attribute}>{athlete?.vertical_jump}</span>
							</div>
						}
						{athlete?.broad_leap &&
							<div className={styles.attributeContainer}>
								<div className={styles.attributeTitle}>Broad Jump</div>
								<span className={styles.attribute}>{athlete?.broad_leap}</span>
							</div>
						}
						{athlete?.five_ten_five &&
							<div className={styles.attributeContainer}>
								<div className={styles.attributeTitle}>5-10-5</div>
								<span className={styles.attribute}>{athlete?.five_ten_five}</span>
							</div>
						}
					</div>
				</div> :
				null}
				{athlete?.ig || athlete?.twitter || athlete?.tik_tok ?
					<div className={styles.socialMediaIconsContainer}>
						<h3>My Social Media</h3>
						<div className={styles.socialMediaIconContainer}>
							{athlete?.ig &&
								<div className={styles.attributeContainer}>
									<a className={styles.attribute} target='_blank' rel="noreferrer" href={`https://www.instagram.com/${athlete?.ig}`}>
										<Image alt='instagram' src={instagram} height={60} width={60}/>
									</a>
								</div>
							}
							{athlete?.tik_tok &&
								<div className={styles.attributeContainer}>
									<a className={styles.attribute} target='_blank' rel="noreferrer" href={`https://www.tiktok.com/@${athlete?.tik_tok}`}>
										<Image alt='Tik Tok' src={tiktok} height={60} width={60}/>
									</a>
								</div>
							}
							{athlete?.twitter &&
								<div className={styles.attributeContainer}>
									<a className={styles.attribute} target='_blank' rel="noreferrer" href={`https://www.twitter.com/${athlete?.twitter}`}>
										<Image alt='Twitter' src={twitter} height={60} width={60}/>
									</a>
								</div>
							}
							{athlete?.facebook &&
								<div className={styles.attributeContainer}>
									<a className={styles.attribute} target='_blank' rel="noreferrer" href={`https://www.facebook.com/${athlete?.facebook}`}>
										<Image alt='Facebook' src={facebook} height={60} width={60}/>
									</a>
								</div>
							}
						</div>
					</div>
				: null}
				{athlete?.store ?
					<div className={styles.shopContainer}>
						<h3>Visit {athlete?.name ? `${athlete?.name.trim()}'s shop` : 'Visit My Shop'}</h3>
						<a target='_blank' rel="noreferrer" href={athlete?.store}>
							<Image alt='shop' src={shop} height={60} width={60}/>
						</a>
					</div> : null
				}
				{athlete?.highlight &&
					<div className={styles.youtubeContainer}>
						<h3>Highlight Reel</h3>
						<div className={styles.videoContainer}>
							<YouTube videoId={athlete?.highlight} opts={opts} />
						</div>
					</div>
				}
			</div>
		</div>
	)
}
AthleteByID.PageLayout = IndexLayout;

export default AthleteByID
