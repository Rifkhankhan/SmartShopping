import React, { useEffect } from 'react'
// import products from './../../products'
import { Col, Row } from 'react-bootstrap'

import Product from '../../Components/Product/Product'
import Loading from '../../Components/Loading'

import { useGetProductsQuery } from '../../store/productApiSlice'

const Home = () => {
	const { data: data, isLoading, error } = useGetProductsQuery()

	return (
		<>
			{isLoading && (
				<Row>
					<Loading />
				</Row>
			)}
			{!isLoading && (
				<Row>
					{data.products.map(product => (
						<Col sm={12} md={6} lg={4} xl={3} key={product}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	)
}

export default Home
