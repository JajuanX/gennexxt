import '../styles/globals.css'
import UserContext from '../lib/context';
import useUserData from '../lib/userHooks';
import IndexLayout from '../layouts/IndexLayout';

function MyApp({ Component, pageProps }) {
	const userData = useUserData()

	return (
		<UserContext.Provider value={userData}>
			{Component.PageLayout ?
				<IndexLayout> 
					<Component {...pageProps} />
				</IndexLayout>
				:
				<Component {...pageProps} />
			}
		</UserContext.Provider>
	)
}

export default MyApp
