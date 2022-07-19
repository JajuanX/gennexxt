/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from './athlete-card.module.scss'
import starIcon from '../../public/star.min.svg'
import UserContext from '../../lib/context';

// Replace words with Icons hat represent each link
function AthleteCard({athlete}) {
	const {isAdmin} = useContext(UserContext);

	return (
		<div className={styles.athleteCard}>
			<div className={styles.titleContainer}>
				<div className={`${styles.left} truncate ...`}>
					<span className={styles.name}>{athlete.name}</span><span className={styles.position}>{athlete.position}</span>
				</div>
				<span>{athlete.class}</span>
			</div>
			<div>
				{
					Array.from(Array(Number(athlete.stars)).keys()).map((star) => (
						<Image key={star} src={starIcon} height={20} width={20} alt='star' />
					))
				}
			</div>
			<div className={styles.titleContainer}>
				<div>{athlete.city}, {athlete.state}</div>
				<div className={styles.buttonContainer}>
					{athlete?.activated && <Link href={`/athlete/${athlete.id}`} passHref>
						<a>
							View Profile
						</a>
					</Link>}
					{isAdmin && <Link href={`/admin/edit/${athlete.id}`} passHref>
						<a>
							Edit Profile
						</a>
					</Link>}
				</div>
			</div>
		</div>
	)	
}

export default AthleteCard
