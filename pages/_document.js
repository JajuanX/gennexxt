import { Html, Head, Main, NextScript } from 'next/document'
 
function MyDocument() {
	return (
		<Html lang="en">
			<Head >
				<link rel='manifest' href='/manifest.json' />
				<link rel='apple-touch-icon' href='/icon-512x512.png' />
				<meta name="description" content="The number 1 database to find future 5 star youth football players"/>
				<meta name='application-name' content='Future 5 Star' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content='Future 5 Star' />
				<meta name='description' content='The number 1 database to find future 5 star youth football players' />
				<meta name='format-detection' content='telephone=no' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='msapplication-TileColor' content='#2B5797' />
				<meta name='msapplication-tap-highlight' content='no' />
				<meta name='theme-color' content='#000000' />

				<link rel='apple-touch-icon' href='/icon-512x512.png' />
				<link rel='apple-touch-icon' sizes='152x152' href='/icon-512x512.png' />
				<link rel='apple-touch-icon' sizes='180x180' href='/icon-512x512.png' />
				<link rel='apple-touch-icon' sizes='167x167' href='/icon-512x512.png' />

				<link rel='icon' type='image/png' sizes='32x32' href='/icon-512x512.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/icon-512x512.png' />
				<link rel='manifest' href='/manifest.json' />
				<link rel='mask-icon' href='/icon-512x512.png' color='#5bbad5' />
				<link rel='shortcut icon' href='/icon-512x512.png' />
				<meta name='twitter:card' content='summary' />
				<meta name='twitter:url' content='https://futurefivestar.com' />
				<meta name='twitter:title' content='Future 5 Star' />
				<meta name='twitter:description' content='The number 1 database to find future 5 star youth football players' />
				<meta name='twitter:image' content='https://futurefivestar.com/icon-192x192.png' />
				<meta name='twitter:creator' content='@Driven_juan' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Future 5 Star' />
				<meta property='og:description' content='The number 1 database to find future 5 star youth football players' />
				<meta property='og:site_name' content='Future 5 Star' />
				<meta property='og:url' content='https://futurefivestar.com' />
				<meta property='og:image' content='https://futurefivestar.com/icon-192x192.png' />

			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default MyDocument