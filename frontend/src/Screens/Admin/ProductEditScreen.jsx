import React, { useEffect, useState } from 'react'
import {
	Alert,
	Button,
	Card,
	Col,
	Container,
	Form,
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
	useUpdateProductMutation,
	useGetProductQuery,
	useUploadMutation
} from '../../store/productApiSlice'
import FormContainer from '../../Components/FormContainer'
const ProductEditScreen = () => {
	const { id } = useParams()

	const navigate = useNavigate()
	const [uploadFile, { isLoading: uploadLoading, error: uploadError }] =
		useUploadMutation()
	const {
		data: product,
		isLoading: productLoading,
		refetch,
		error: productError
	} = useGetProductQuery(id)

	const initialInputsState = {
		name: product?.name || '',
		price: product?.price || 0,
		image: product?.image || '',
		brand: product?.brand || '',
		category: product?.category || '',
		description: product?.description || '',
		countInStock: product?.countInStock || 0
	}

	// State for inputs
	const [inputs, setInputs] = useState(initialInputsState)

	console.log(inputs)

	useEffect(() => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				...product
			}
		})

		return () => {}
	}, [product])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: enteredValue
			}
		})
	}
	const [updatedProduct, { isLoading: updateLoading, error: updateError }] =
		useUpdateProductMutation()

	const submitHandler = async e => {
		e.preventDefault()

		await updatedProduct(inputs)
		navigate('/admin/products')
		toast.success('Product Updated!')
	}

	const updloadFileHandler = async e => {
		const formData = new FormData()
		formData.append('image', e.target.files[0])

		try {
			const res = await uploadFile(formData).unwrap()
			console.log(res.image)
			setInputs(currentInput => {
				return { ...currentInput, image: res.image }
			})

			toast.success(res?.message)
		} catch (error) {
			toast.error(error?.data?.message || error.message)
		}
	}
	return (
		<>
			<Link to="/admin/products" className="btn btn-success my-2">
				Back
			</Link>
			<FormContainer md={8}>
				<h1>Edit Product</h1>
				{updateLoading && <Loading />}
				{productLoading ? (
					<Loading />
				) : productError ? (
					<Alert variant="danger">
						{productError?.data?.message || productError.message}
					</Alert>
				) : (
					<>
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="name" className="mt-2">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Product Name"
									required
									value={inputs.name}
									onChange={e => inputTextChangeHandler('name', e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="price" className="mt-2">
								<Form.Label>Price</Form.Label>
								<Form.Control
									type="number"
									placeholder="Enter Price"
									required
									value={inputs.price}
									onChange={e =>
										inputTextChangeHandler('price', e.target.value)
									}
								/>
							</Form.Group>
							<Form.Group controlId="Image" className="mt-2">
								<Form.Label>Image</Form.Label>

								<Form.Control
									type="file"
									placeholder="Choose file"
									onChange={updloadFileHandler}
								/>
							</Form.Group>

							<Form.Group controlId="Brand" className="mt-2">
								<Form.Label>Brand</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Product Brand"
									required
									value={inputs.brand}
									onChange={e =>
										inputTextChangeHandler('brand', e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group controlId="Category" className="mt-2">
								<Form.Label>Category</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Product Category"
									required
									value={inputs.category}
									onChange={e =>
										inputTextChangeHandler('category', e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group controlId="description" className="mt-2">
								<Form.Label>Description</Form.Label>
								<Form.Control
									type="text"
									multiple={true}
									placeholder="Enter Product Description"
									required
									value={inputs.description}
									onChange={e =>
										inputTextChangeHandler('description', e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group controlId="description" className="mt-2">
								<Button variant="success" type="submit">
									Update Product
								</Button>
							</Form.Group>
						</Form>
					</>
				)}
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
