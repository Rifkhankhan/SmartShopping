import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
	name: 'product',
	initialState: {
		loading: false,

		products: [],
		productActivities: []
	},
	reducers: {
		createProduct: (state, action) => {
			console.log(action.payload)
			state.products.push(action.payload)
		},
		getProducts: (state, action) => {
			state.products = [...action.payload]
		},
		handleLoading: state => {
			state.loading = !state.loading
		},
		getProductActivities: (state, action) => {
			state.userActivities = [...action.payload]
		},
		getProduct: (state, action) => {
			//   if (action.payload.success) state.notification = true;
		},
		deleteProduct: (state, action) => {
			state.products = state.products.filter(user => user.id !== action.payload)
		},
		updateProduct: (state, action) => {
			const updatedUser = {
				id: action.payload.id,
				...action.payload.formData
			}

			// Find the index of the object to update
			const index = state.products.findIndex(
				user => user.id === action.payload.id
			)

			if (index !== -1) {
				// Create a new array with the updated object
				const updatedUsers = [
					...state.products.slice(0, index), // elements before the updated object
					updatedUser, // updated object
					...state.products.slice(index + 1) // elements after the updated object
				]
				state.products = updatedUsers
			}
		},
		activateToggle: (state, action) => {
			// find user
			const updatedUser = state.products.find(
				user => user.id === action.payload
			)
			updatedUser.status = !updatedUser?.status
			// Find the index of the object to update
			const index = state.products.findIndex(user => user.id === action.payload)
			if (index !== -1) {
				// Create a new array with the updated object
				const updatedUsers = [
					...state.products.slice(0, index), // elements before the updated object
					updatedUser, // updated object
					...state.products.slice(index + 1) // elements after the updated object
				]
				state.products = updatedUsers
			}
		}
	}
})

export const productActions = productSlice.actions
// export const classAction = classSlice.actions

export default productSlice.reducer
