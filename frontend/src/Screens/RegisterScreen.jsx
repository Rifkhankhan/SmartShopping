import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredential } from '../store/authSlice'
import FormContainer from '../Components/FormContainer'
import Loading from './../Components/Loading'
import { useRegisterMutation } from './../store/userApiSlice'

import { toast } from 'react-toastify'

const RegisterScreen = () => {
	const [email, setEmail] = useState()
	const [name, setName] = useState()
	const [password, setPassword] = useState()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { userInfo } = useSelector(state => state.auth)

	const [register, { isLoading }] = useRegisterMutation()

	const { search } = useLocation()
	const searchParams = new URLSearchParams(search)
	const redirect = searchParams.get('redirect') || '/'

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [redirect, navigate, userInfo])

	const submitHandler = async e => {
		e.preventDefault()

		try {
			const response = await register({ name, email, password }).unwrap()
			console.log(response)
			dispatch(setCredential({ ...response }))
			navigate(redirect)
		} catch (error) {
			toast.error(error?.data.message || error?.error)
		}
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

				{isLoading && <Loading />}
			</Form>

			<Row className="py-3">
				<Col sx={12} md={6}>
					Already Have Account ?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Sign In
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
