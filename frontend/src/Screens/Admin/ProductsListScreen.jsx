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

import { Link, useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {
	FaEdgeLegacy,
	FaEdit,
	FaTimes,
	FaTrash,
	FaTruckLoading
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import {
	useGetProductsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation
} from '../../store/productApiSlice'
import Paginate from '../../Components/Paginate'

const ProductsListScreen = () => {
	const { pageNumber } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { userInfo } = useSelector(state => state.auth)
	const {
		data,
		isLoading: productsLoading,
		refetch,
		error: productsError
	} = useGetProductsQuery({ pageNumber })

	const [deleteProduct, { isLoading: deleteLoading, error: deleteError }] =
		useDeleteProductMutation()

	const [createProduct, { isLoading: createLoading, error: createError }] =
		useCreateProductMutation()

	const [updatedProduct, { isLoading: updateLoading, error: updateError }] =
		useUpdateProductMutation()

	const createHandler = async () => {
		await createProduct()
		refetch()
	}

	const deleteHandler = async id => {
		try {
			const { data } = await deleteProduct(id)

			toast.success(data.message)
			refetch()
		} catch (error) {
			toast.error(error?.data?.message || error.message)
		}
	}
	return (
		<>
			<Row className="mt-2">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end mt-2">
					<Button
						variant="success"
						onClick={createHandler}
						disabled={createLoading}>
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>

			{productsLoading || createLoading ? (
				<Loading />
			) : productsError ? (
				<Alert>{productsError?.data?.message || productsError.message}</Alert>
			) : createError ? (
				<Alert>{createError?.data?.message || createError.message}</Alert>
			) : (
				<Table striped hover responsive className="table-sm">
					<thead>
						<tr>
							<th>#</th>
							<th>ID</th>
							<th>Name</th>
							<th>Price</th>
							<th>CATEGORY</th>
							<th>BRAND</th>

							<th></th>
						</tr>
					</thead>

					<tbody>
						{data.products?.map((product, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer
										to={`/admin/products/${product._id}/edit`}
										className="m-1">
										<Button variant="danger" type="button" className="btn-sm">
											<FaEdit />
										</Button>
									</LinkContainer>

									<Button
										variant="warning"
										className="btn-sm m-1"
										onClick={() => deleteHandler(product._id)}>
										<FaTrash />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
			<Paginate
				page={data?.page}
				pages={data?.pages}
				isAdmin={userInfo?.isAdmin}
			/>
		</>
	)
}

export default ProductsListScreen
