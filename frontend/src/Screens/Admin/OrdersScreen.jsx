import React from 'react'
import {
	Alert,
	Button,
	Card,
	Col,
	Image,
	ListGroup,
	Row,
	Table
} from 'react-bootstrap'
import Loading from '../../Components/Loading'

import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { useGetOrdersQuery } from '../../store/orderApiSlice'

const OrdersScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		data: orders,
		isLoading: ordersLoading,
		error: orderError
	} = useGetOrdersQuery()

	console.log(orders)

	return (
		<>
			<h1 className="mt-2">Orders</h1>
			{ordersLoading && <Loading />}
			{orders?.length === 0 ? (
				<Row className="mt-3">
					<Alert>Orders is Empty</Alert>
				</Row>
			) : (
				<Table striped hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>User</th>
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
								<td>{order.user.name}</td>
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
		</>
	)
}

export default OrdersScreen
