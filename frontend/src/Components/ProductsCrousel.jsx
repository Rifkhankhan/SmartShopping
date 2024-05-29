import React from 'react'
import { useGetTopProductsQuery } from '../store/productApiSlice'
import Loading from './Loading'
import { Alert, Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductsCrousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery()
	return isLoading ? (
		<Loading />
	) : error ? (
		<Alert variant="danger">{error}</Alert>
	) : (
		<Carousel pause="hover" className="bg-parimary my-4">
			{products.map(product => (
				<Carousel.Item
					key={product._id}
					style={{ backgroundColor: 'darkslategrey' }}>
					<Link to={`/products/${product._id}`}>
						<Image src={product.image} fluid alt={product.name} />
						<Carousel.Caption className="text-bg-dark">
							<h2>
								{product.name} (${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductsCrousel
