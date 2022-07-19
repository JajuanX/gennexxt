/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link';
import styles from './searchByClass.module.scss';

// Replace words with Icons hat represent each link
function SearchByClass({classYear}) {
	const years = [2031, 2030, 2029, 2028, 2027]

	return (
		<div className={styles.searchByClassContainer}>
			<div className={styles.classContainer}>
				{years.map(year => (
					<Link key={year} 
						href={`/classof/${year}/stars/5`} 
						passHref
					>
						<button  className={Number(classYear) !== year ? styles.link : styles.active} type='button'>
							{year}
						</button>
					</Link>
				))}
			</div>
		</div>
	)	
}

export default SearchByClass