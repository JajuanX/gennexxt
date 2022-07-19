/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from './searchByStars.module.scss';
import starIcon from '../../public/star.min.svg'

// Replace words with Icons hat represent each link
function SearchByStar() {
	const stars = [1, 2 , 3, 4, 5];

	return (
		<div className={styles.starContainer}>
			{stars.map(star => (
				<Link href={`/stars/${star}`} key={star} >
					<a>
						<Image src={starIcon} height={20} width={20} alt='star' />
					</a>
				</Link>
			))}
		</div>
	)	
}

export default SearchByStar;