import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import FormContainer from '../Components/FormContainer'

const RegisterScreen = () => {
	const [email, setEmail] = useState()
	const [name, setName] = useState()
	const [password, setPassword] = useState()

	const submitHandler = e => {
		e.preventDefault()
	}
	return (
		<FormContainer>
			<h1>Register Account</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name" className="my-3">
					<Form.Label>Name :</Form.Label>
					<Form.Control
						type="text"
						placeholder="Rifkhan"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="email" className="my-3">
					<Form.Label>Email :</Form.Label>
					<Form.Control
						type="email"
						placeholder="example@gmail.com"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="password" className="my-3">
					<Form.Label>Password :</Form.Label>
					<Form.Control
						type="password"
						placeholder="4854185"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="password" className="my-3">
					<Button type="submit" variant="danger" className="mt-2">
						Register
					</Button>
				</Form.Group>
			</Form>

			<Row className="py-3">
				<Col sx={12} md={6}>
					Already Have Account ? <Link to="/login">Sign In</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
