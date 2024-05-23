import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../Actions/productAction'
import { Link } from 'react-router-dom'
import { FaFlask, FaTrash } from 'react-icons/fa'

const CartScreen = () => {
	const products = useSelector(state => state.product.products)
	console.log(products)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProducts())
	}, [])

	return (
		<>
			<Row>
				<Col md={8}>
					<h1 className="mt-2">Shopping Cart</h1>

					<ListGroup variant="flush">
						{products.map(product => (
							<ListGroup.Item>
								<Row>
									<Col md={2}>
										<Image src={product.image} fluid rounded />
									</Col>
									<Col md={4}>
										<Link to={`/product/${product._id}`}>{product.name}</Link>
									</Col>
									<Col md={2}>${product.price}</Col>
									<Col md={2}>
										<Button
											className="btn btn-danger"
											variant="light"
											type="button">
											<FaTrash />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>

				<Col md={4} className="mt-3">
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>
									Subtotal ({products.reduce((acc, item) => acc + 1, 0)}) items
								</h2>
								$18656
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn btn-block"
									disabled={products.length === 0}>
									Proceed To Checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default CartScreen
