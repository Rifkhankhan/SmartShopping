import React from 'react'
import { Helmet } from 'react-helmet-async'

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
		</Helmet>
	)
}

Meta.defaultProps = {
	title: 'Welcome to SmartShopping',
	description: 'Wel sell the best products',
	keywords: 'electronics, buy electronics, cheap electronics'
}

export default Meta
