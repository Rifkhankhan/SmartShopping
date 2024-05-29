import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
	Alert
} from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loading from '../Components/Loading'
import { toast } from 'react-toastify'

import { useGetProductQuery, useReviewMutation } from '../store/productApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from './../store/cartSlice'
import Meta from '../Components/Meta'

const ProductDetails = () => {
	const params = useParams()
	const id = params?.id
	const [review, setReview] = useState(0)
	const [comment, setComment] = useState()
	const [rating, setRating] = useState()
	const { userInfo } = useSelector(state => state.auth)

	const { data: product, refetch, isLoading, error } = useGetProductQuery(id)
	const [createReview, { isLoading: reviewLoading, error: reviewError }] =
		useReviewMutation()

	const navigate = useNavigate()
	const [qty, setQty] = useState(1)
	const dispatch = useDispatch()

	const addToCardHandler = () => {
		dispatch(addToCart({ ...product, qty }))
		navigate('/cart')
	}

	const submitHandler = async e => {
		e.preventDefault()
		try {
			const response = await createReview({ id: id, rating, comment }).unwrap()
			refetch()
			setRating(null)
			setComment('')
			toast.success(response?.message)
		} catch (error) {
			toast.error(error?.data.message || error.message)
		}
	}

	return (
		<>
			<Meta title={product?.name} />
			<Link className="btn btn-success my-2" to="/">
				Back
			</Link>
			{isLoading && (
				<Row>
					<Loading />
				</Row>
			)}
			{!isLoading && (
				<>
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
												{product?.countInStock > 0
													? 'In Stock'
													: 'Out of Stock'}
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
					<Row className="review mt-2">
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews?.length === 0 && (
								<Alert variant="danger">There is no review</Alert>
							)}

							<ListGroup variant="flush">
								{product.reviews.map(review => (
									<ListGroup.Item>
										<string>{review?.name}</string>
										<Rating value={review?.rating} />
										<p>{review?.createdAt?.substring(0, 10)}</p>
										<p>{review?.comment}</p>
									</ListGroup.Item>
								))}

								<ListGroup.Item>
									<h2>Write a cutomer review</h2>
									{reviewLoading && <Loading />}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="rating" className="my-2">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={e => setRating(Number(e.target.value))}>
													<option value="">Select...</option>
													<option value="1">1 - Poor</option>
													<option value="2">2 - Fair</option>
													<option value="3">3 - Good</option>
													<option value="4">4 - Very Good</option>
													<option value="5">5 - Excellent</option>
												</Form.Control>
											</Form.Group>

											<Form.Group controlId="comment" className="my-2">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													rows="3"
													value={comment}
													onChange={e =>
														setComment(e.target.value)
													}></Form.Control>
											</Form.Group>

											<Button type="submit" variant="success">
												Submit
											</Button>
										</Form>
									) : (
										<Alert>
											Please <Link to="/login">Sign in</Link> to write a review
										</Alert>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductDetails
