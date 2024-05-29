import React, { useEffect, useState } from 'react'
import FormContainer from '../Components/FormContainer'
import CheckOutSteps from '../Components/CheckOutSteps'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethode } from '../store/cartSlice'

const PaymentScreen = () => {
	const [paymentMethode, serPaymentMethode] = useState('PayPal')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	// need to check shipping address else go to shipping screen

	const cart = useSelector(state => state.cart)

	useEffect(() => {
		if (!cart.shippingAddress) {
			navigate('/shipping')
		}
	}, [cart.shippingAddress, navigate])

	const submitHandler = e => {
		e.preventDefault()
		dispatch(savePaymentMethode({ paymentMethode }))
		navigate('/placeorder')
	}
	return (
		<FormContainer>
			<CheckOutSteps step1 step2 step3 />

			<h1>Payment Methode</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							className="my-2"
							value={paymentMethode}
							placeholder="Cart"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethode"
							checked
							onChange={e => serPaymentMethode(e.target.value)}
						/>
					</Col>
				</Form.Group>

				<Button variant="success" type="submit" className="my-3">
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen
