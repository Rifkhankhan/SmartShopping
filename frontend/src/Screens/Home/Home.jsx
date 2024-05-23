import React, { useEffect } from 'react'
// import products from './../../products'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../../Components/Product/Product'
import Loading from '../../Components/Loading'
import { getProducts } from '../../Actions/productAction'

const Home = () => {
	const products = useSelector(state => state.product.products)
	const loading = useSelector(state => state.product.loading)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProducts())
	}, [dispatch])

	return (
		<>
			{loading && (
				<Row>
					<Loading />
				</Row>
			)}
			{!loading && (
				<Row>
					{products.map(product => (
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
