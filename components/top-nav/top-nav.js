/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from './top-nav.module.scss';
import Logo from '../../public/FFLogo.png';
import UserContext from '../../lib/context';

function TopNav() {
	const {isAdmin} = useContext(UserContext);

	return (
		<div className={styles.topNavContainer}>
			<div>
				<Link href='/'>
					<a>
						<Image src={Logo} height={80} width={80} alt='Future 5 star' />
					</a>
				</Link>
			</div>
			{ isAdmin && <div>
				<Link href='/admin'>
					Admin
				</Link>
			</div>}
		</div>
	)	
}

export default TopNav