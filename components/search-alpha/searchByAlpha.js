/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link';
import styles from './searchByAlpha.module.scss';

// Replace words with Icons hat represent each link
function SearchByAlpha({selected}) {
	const alpha = Array.from(Array(26)).map((e, i) => i + 65);
	const alphabetLetters = alpha.map((x) => String.fromCharCode(x));

	return (
		<div className={styles.searchByAlphaContainer}>
			<div className={styles.classContainer}>
				{alphabetLetters.map(letter => (
					<Link key={letter} 
						href={`/athletes/${letter}`} 
						passHref
					>
						<button className={`${selected !== letter ? styles.link : styles.active}`} type='button'>
							<span>{letter}</span>
						</button>
					</Link>
				))}
			</div>
		</div>
	)	
}

export default SearchByAlpha