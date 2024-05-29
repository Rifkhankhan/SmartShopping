import React, { useEffect, useState } from 'react'
import FormContainer from './../Components/FormContainer.jsx'
import {
	Alert,
	Button,
	Card,
	Col,
	Image,
	ListGroup,
	Row
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearCartItems } from '../store/cartSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import CheckOutSteps from '../Components/CheckOutSteps.jsx'
import { useCreateOrderMutation } from './../store/orderApiSlice.js'
import Loading from '../Components/Loading.jsx'
import { toast } from 'react-toastify'

const PlaceOrderScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [createOrder, { isLoading, error }] = useCreateOrderMutation()

	const cart = useSelector(state => state.cart)

	useEffect(() => {
		if (!cart?.shippingAddress.address) {
			navigate('/shipping')
		} else if (!cart?.paymentMethod) {
			navigate('/payment')
		}
	}, [cart?.paymentMethod, cart?.shippingAddress, navigate])

	const checkoutHandler = async () => {
		try {
			console.log(cart)
			const response = await createOrder({ ...cart }).unwrap()
			dispatch(clearCartItems())
			navigate(`/orders/${response._id}`)
		} catch (error) {
			toast.error(error)
		}
	}

	return (
		<FormContainer>
			<CheckOutSteps step1 step2 step3 step4 />
			<h1>Place Order</h1>

			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>Shipping</h3>
							<p>
								<strong>Address :</strong>
								{cart?.shippingAddress?.address} ,{cart?.shippingAddress?.city}
								{cart?.shippingAddress?.postalCode} ,
								{cart?.shippingAddress?.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h3>Payment Method</h3>
							<p>
								<strong>Method :</strong>
								{cart?.paymentMethod.paymentMethode}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h3>Order Items</h3>
							{cart.cardItems.length === 0 ? (
								<Alert>Your Cart is empty</Alert>
							) : (
								<ListGroup variant="flush">
									{cart.cardItems.map(cartItem => (
										<ListGroup.Item>
											<Row>
												<Col md={4}>
													<Image src={cartItem.image} fluid rounded />
												</Col>
												<Col md={4}>
													<Link to={`/product/${cartItem._id}`}>
														{cartItem.name}
													</Link>
												</Col>
												<Col md={2}>
													${cartItem.price} * {cartItem.qty}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Card Summery</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items :</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping :</Col>
									<Col>$0</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax :</Col>
									<Col>$0</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total :</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							{error && (
								<ListGroup.Item>
									<Alert variant="danger">{error.data?.message}</Alert>
								</ListGroup.Item>
							)}

							<ListGroup.Item>
								<Button
									type="submit"
									variant="secondary"
									className="my-2"
									onClick={checkoutHandler}
									disabled={cart.cardItems.length === 0}>
									Checkout
								</Button>

								{isLoading && <Loading />}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default PlaceOrderScreen
