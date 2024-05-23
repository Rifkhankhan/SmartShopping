import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	FormControl,
	Form
} from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loading from '../Components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../Actions/productAction'

const ProductDetails = () => {
	const params = useParams()
	const id = params.id
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [qty, setQty] = useState(1)

	useEffect(() => {
		dispatch(getProducts())
	}, [dispatch])

	const products = useSelector(state => state.product.products)
	const loading = useSelector(state => state.product.loading)

	const product = products?.find(product => product._id === id)

	const addToCardHandler = () => {
		navigate('/cart')
	}

	return (
		<>
			<Link className="btn btn-success my-2" to="/">
				Back
			</Link>
			{loading && (
				<Row>
					<Loading />
				</Row>
			)}
			{!loading && (
				<Row>
					<Col md={5}>
						<Image src={product?.image} alt={product?.name} fluid />
					</Col>

					<Col md={4}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product?.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating value={product?.rating} text={product?.numReviews} />
							</ListGroup.Item>
							<ListGroup.Item>
								<h4>Price {product?.price}</h4>
							</ListGroup.Item>

							<ListGroup.Item>
								<p>{product?.description}</p>
							</ListGroup.Item>
						</ListGroup>
					</Col>

					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price : </Col>
										<Col>{product?.price}</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status : </Col>
										<Col>
											{product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Qty : </Col>
										<Col>
											<Form.Control
												type="number"
												value={qty}
												onChange={e =>
													setQty(e.target.value)
												}></Form.Control>{' '}
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Button
											className="btn-block btn-warning"
											type="button"
											onClick={addToCardHandler}
											disabled={product?.countInStock === 0}>
											Add To Card
										</Button>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductDetails
