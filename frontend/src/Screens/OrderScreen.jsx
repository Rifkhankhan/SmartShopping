import React, { useEffect } from 'react'
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
import { Link, useParams } from 'react-router-dom'
import CheckOutSteps from '../Components/CheckOutSteps.jsx'
import {
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
	useGetOrderByIdQuery,
	useDeiverOrderMutation
} from './../store/orderApiSlice.js'
import Loading from '../Components/Loading.jsx'
import { toast } from 'react-toastify'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

const OrderScreen = () => {
	const { id } = useParams()

	const { data: order, isLoading, refetch, error } = useGetOrderByIdQuery(id)
	const { userInfo } = useSelector(state => state.auth)
	const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

	const [deliverOrder, { isLoading: deliverLoading, error: deliverError }] =
		useDeiverOrderMutation()

	const {
		data: paypal,
		isLoading: loadingPaypal,
		error: errorPayPal
	} = useGetPayPalClientIdQuery()

	const deliverOrderHandler = async () => {
		try {
			await deliverOrder(id).unwrap()
			refetch()
			toast.success('Delivered Successfully!')
		} catch (error) {
			toast.error(error?.data.message || error.message)
		}
	}

	useEffect(() => {
		if (!errorPayPal && !loadingPaypal && paypal.clientId) {
			const loadPayPalScript = async () => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						clientId: paypal.clientId,
						currency: 'USD'
					}
				})
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
			}

			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadPayPalScript()
				}
			}
		}
	}, [order, paypal, paypalDispatch, loadingPaypal, errorPayPal])

	const createOrder = (data, actions) => {
		const totalPrice = order?.itemsPrice || 0
		if (totalPrice <= 0) {
			toast.error('Order total price must be greater than zero.')
			return
		}
		return actions.order.create({
			purchase_units: [
				{
					amount: { value: totalPrice.toFixed(2) }
				}
			]
		})
	}

	const onApprove = (data, actions) => {
		return actions.order.capture().then(async function (details) {
			try {
				await payOrder({ id, details })
				refetch()
				toast.success('Payment successful')
			} catch (error) {
				toast.error(error?.data?.message || error.message)
			}
		})
	}

	const onError = error => {
		toast.error(error.message)
	}

	return (
		<FormContainer>
			<CheckOutSteps step1 step2 step3 step4 />
			<h1>Order {order?._id}</h1>
			{isLoading && <Loading />}
			{error && <Alert variant="danger">{error.message}</Alert>}
			{!isLoading && (
				<Row>
					<Col md={8}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>Shipping</h3>
								<p>
									<strong>Name: </strong> {order?.user?.name}
								</p>
								<p>
									<strong>Email: </strong> {order?.user?.email}
								</p>
								<p>
									<strong>Address: </strong>
									{order?.shippingAddress[0]?.address},{' '}
									{order?.shippingAddress[0]?.postalCode},{' '}
									{order?.shippingAddress[0]?.city}{' '}
									{order?.shippingAddress[0]?.country}
								</p>
								<p>
									{order?.isDeliverd ? (
										<Alert variant="success">
											Delivered on {order?.deliveredAt}
										</Alert>
									) : (
										<Alert variant="danger">Not delivered</Alert>
									)}
								</p>
							</ListGroup.Item>

							<ListGroup.Item>
								<h3>Payment Method</h3>
								<p>
									<strong>Method:</strong> {order?.paymentMethod}
								</p>
								<p>
									{order?.isPaid ? (
										<Alert variant="success">Paid on {order?.paidAt}</Alert>
									) : (
										<Alert variant="danger">Not Paid</Alert>
									)}
								</p>
							</ListGroup.Item>

							<ListGroup.Item>
								<h3>Order Items</h3>
								{order?.cardItems?.length === 0 ? (
									<Alert>Your Cart is empty</Alert>
								) : (
									<ListGroup>
										{order?.orderItems?.map(cartItem => (
											<ListGroup.Item key={cartItem.image}>
												<Row>
													<Col md={2}>
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
						<Card className="my-2">
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>Order Summary</h2>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Items:</Col>
										<Col>${order?.itemsPrice}</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Shipping:</Col>
										<Col>$0</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Tax:</Col>
										<Col>$0</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Total:</Col>
										<Col>${order?.itemsPrice}</Col>
									</Row>
								</ListGroup.Item>

								{error && (
									<ListGroup.Item>
										<Alert variant="danger">{error.data?.message}</Alert>
									</ListGroup.Item>
								)}

								{userInfo.isAdmin &&
									order.isPaid &&
									!deliverLoading &&
									!order.isDeliverd && (
										<ListGroup.Item>
											<Button
												variant="success"
												className="btn btn-block"
												onClick={deliverOrderHandler}>
												Mark as Deliver
											</Button>
										</ListGroup.Item>
									)}

								{userInfo.isAdmin && deliverLoading && (
									<ListGroup.Item>
										<Loading />
									</ListGroup.Item>
								)}

								{userInfo.isAdmin && deliverError && (
									<ListGroup.Item>
										<Alert>
											{deliverError?.data?.message || deliverError.message}
										</Alert>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									{isPending ? (
										<Loading />
									) : (
										<PayPalButtons
											createOrder={createOrder}
											onApprove={onApprove}
											onError={onError}></PayPalButtons>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</FormContainer>
	)
}

export default OrderScreen
