import React, { useEffect } from 'react'
// import products from './../../products'
import { Col, Row } from 'react-bootstrap'

import Product from '../../Components/Product/Product'
import Loading from '../../Components/Loading'

import {
	useGetProductsQuery,
	useGetTopProductsQuery
} from '../../store/productApiSlice'
import { useParams } from 'react-router-dom'
import Paginate from '../../Components/Paginate'
import { useSelector } from 'react-redux'
import ProductsCrousel from '../../Components/ProductsCrousel'

const Home = () => {
	const { keyword, pageNumber } = useParams()

	const { data, isLoading, error } = useGetProductsQuery({
		keyword,
		pageNumber
	})

	return (
		<>
			{isLoading && (
				<Row>
					<Loading />
				</Row>
			)}
			{!isLoading && (
				<>
					{!keyword && <ProductsCrousel />}
					<Row>
						{data?.products?.map(product => (
							<Col sm={12} md={6} lg={4} xl={3} key={product}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						page={data?.page}
						pages={data?.pages}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	)
}

export default Home
