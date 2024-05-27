import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import FormContainer from '../Components/FormContainer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredential } from '../store/authSlice'
import { useLoginMutation } from './../store/userApiSlice'
import { toast } from 'react-toastify'
import Loading from './../Components/Loading'

const LoginScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { userInfo } = useSelector(state => state.auth)
	const [login, { isLoading }] = useLoginMutation()

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
			const response = await login({ email, password }).unwrap()

			console.log(response)
			dispatch(setCredential({ ...response }))
			navigate(redirect)
		} catch (error) {
			toast.error(error?.data.message || error?.error)
		}
	}
	return (
		<FormContainer>
			<h1>Sign In</h1>
			<Form onSubmit={submitHandler}>
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
					<Button
						type="submit"
						variant="success"
						className="mt-2"
						disabled={isLoading}>
						Sign In
					</Button>
				</Form.Group>

				{isLoading && <Loading />}
			</Form>

			<Row className="py-3">
				<Col sx={12} md={6}>
					New Customer ?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
