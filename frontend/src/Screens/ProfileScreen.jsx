import React, { useEffect, useState } from 'react'
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	Row,
	Table
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import {
	useProfileQuery,
	useUpdateProfileMutation
} from './../store/userApiSlice'
import { setCredential } from './../store/authSlice'
import Loading from '../Components/Loading'
import { useGetMyOrdersQuery } from '../store/orderApiSlice'

const ProfileScreen = () => {
	const { userInfo } = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const [updateProfile, { isLoading: loadingUpdate, error: updateError }] =
		useUpdateProfileMutation()
	const { data, isLoading, error } = useProfileQuery()
	const {
		data: orders,
		isLoading: ordersLoading,
		error: orderError
	} = useGetMyOrdersQuery()

	console.log(orders)
	console.log(ordersLoading)

	const [name, setName] = useState(userInfo.name || data?.name || '')
	const [email, setEmail] = useState(userInfo.email || data?.email || '')
	const [password, setPassword] = useState()

	useEffect(() => {
		if (data) {
			setName(data.name)
			setEmail(data.email)
		}
	}, [data])

	const submitHandler = async e => {
		e.preventDefault()

		try {
			const response = await updateProfile({ name, email, password }).unwrap()

			dispatch(setCredential(response))
			toast.success('Profile Update Successfully')
		} catch (error) {
			toast.error(error?.data?.message || error.message)
		}
	}
	return (
		<Row className="mt-3">
			<Col md={3} className="mt-3">
				<h1>Profile</h1>
				<Form onSubmit={submitHandler} className="mt-2">
					<Form.Group className="mt-2" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Rifkhan"
							value={name}
							required
							onChange={e => setName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mt-2" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							value={email}
							required
							onChange={e => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mt-2" controlId="Password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							required
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mt-2">
						{loadingUpdate && <Loading />}
						<Button variant="secondary" type="submit" disabled={loadingUpdate}>
							Update
						</Button>
					</Form.Group>
				</Form>
			</Col>
			<Col md={9} className="mt-3">
				<h2>Orders</h2>
				{ordersLoading ? (
					<Loading />
				) : orderError ? (
					<Alert>{error?.data?.message || error.message}</Alert>
				) : (
					<Table striped hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>

						<tbody>
							{orders?.map(order => (
								<tr>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice} </td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<FaTimes style={{ color: 'red' }} />
										)}
									</td>
									<td>
										{order.isDeliverd ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<FaTimes style={{ color: 'red' }} />
										)}
									</td>

									<td>
										<LinkContainer to={`/orders/${order._id}`}>
											<Button className="btn-sm" variant="light">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	)
}

export default ProfileScreen
