import { userSlice } from './userSlice'
import { productSlice } from './productSlice'

import { thunk } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		product: productSlice.reducer,
		user: userSlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})
