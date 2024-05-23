import * as productApi from '../Apis/productApi'
import { productActions } from '../store/productSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const createProduct = formData => async dispatch => {
	dispatch(productActions.handleLoading())
	try {
		const { data } = await productApi.createproduct(formData)

		if (data.success) {
			dispatch(productActions.createProduct(data.requests))
			// swal('Successfully Created!', 'Now You can Continue', 'success')
			toast.success('Completed Successfully!', {
				autoClose: 2000
			})
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(productActions.handleLoading())
}

export const getProducts = () => async dispatch => {
	dispatch(productActions.handleLoading())
	try {
		const { data } = await productApi.getproducts()

		if (data.success) {
			dispatch(productActions.getProducts(data.products))
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(productActions.handleLoading())
}

export const updateProduct = (formData, datas) => async dispatch => {
	dispatch(productActions.handleLoading())

	try {
		const { data } = await productApi.updateproduct(formData.arid, formData)
		if (data.success) {
			dispatch(productActions.createProduct(data.requests))
			toast.success('Updated Successfully!', {
				autoClose: 2000
			})
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(productActions.handleLoading())
}

export const deleteProduct = formData => async dispatch => {
	dispatch(productActions.handleLoading())
	try {
		// const { data } = await productApi.disableProduct(formData)
		// if (data.success) {
		// 	dispatch(productActions.deleteProduct(data.product))
		// 	toast.success('Deleted Successfully!', {
		// 		autoClose: 2000
		// 	})
		// } else {
		// 	toast.error('Opps Something wrong!', {
		// 		autoClose: 2000
		// 	})
		// }
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(productActions.handleLoading())
}
