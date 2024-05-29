import React, { useState } from 'react'
import FormContainer from './../Components/FormContainer.jsx'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddresss } from '../store/cartSlice.js'
import { useNavigate } from 'react-router-dom'
import CheckOutSteps from '../Components/CheckOutSteps.jsx'

const ShippingScreen = () => {
	const [address, setAddress] = useState()
	const [city, setCity] = useState()
	const [postalCode, setPostalCode] = useState()
	const [country, setCountry] = useState()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const submitHandler = e => {
		dispatch(saveShippingAddresss({ address, city, postalCode, country }))
		navigate('/payment')
	}
	return (
		<FormContainer>
			<CheckOutSteps step1 step2 />
			<h1>Shipping</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address" className="my-2">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Your Address"
						required
						value={address}
						onChange={e => setAddress(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="City" className="my-2">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Your PostaCode"
						required
						value={city}
						onChange={e => setCity(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="PostaCode" className="my-2">
					<Form.Label>PostaCode</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Your PostaCode"
						required
						value={postalCode}
						onChange={e => setPostalCode(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="PostaCode" className="my-2">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Your PostaCode"
						required
						value={country}
						onChange={e => setCountry(e.target.value)}
					/>
				</Form.Group>

				<Button type="submit" variant="secondary" className="my-2">
					Submit
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
