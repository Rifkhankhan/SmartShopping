import React from 'react'
import {
	Alert,
	Button,
	Card,
	Col,
	Image,
	ListGroup,
	Row
} from 'react-bootstrap'

import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../store/cartSlice'

const CartScreen = () => {
	const cartItems = useSelector(state => state.cart.cardItems)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const removeCart = id => {
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = () => {
		navigate('/login?redirect=/shipping')
	}

	return (
		<>
			{cartItems.length === 0 && (
				<Row className="mt-3">
					<Alert>Cart is Empty</Alert>
				</Row>
			)}
			{cartItems.length > 0 && (
				<Row>
					<Col md={8}>
						<h1 className="mt-2">Shopping Cart</h1>

						<ListGroup variant="flush">
							{cartItems?.map(product => (
								<ListGroup.Item>
									<Row>
										<Col md={2}>
											<Image src={product.image} fluid rounded />
										</Col>
										<Col md={4}>
											<Link to={`/product/${product._id}`}>{product.name}</Link>
										</Col>
										<Col md={2}>
											${product.price} * {product.qty}
										</Col>

										<Col md={2}>
											<Button
												className="btn btn-danger"
												variant="light"
												onClick={() => removeCart(product._id)}
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
										Subtotal ({cartItems?.reduce((acc, item) => acc + 1, 0)})
										items
									</h2>
									{cartItems?.reduce(
										(acc, item) => acc + item.price * item.qty,
										0
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									<Button
										type="button"
										className="btn btn-block"
										onClick={checkoutHandler}
										disabled={cartItems?.length === 0}>
										Proceed To Checkout
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default CartScreen
