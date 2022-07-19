const path = require('path')
const withPWA = require('next-pwa')

module.exports = withPWA({
	reactStrictMode: true,
	poweredByHeader: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com', 'graph.facebook.com'],
	},
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === 'development'
	},
});
