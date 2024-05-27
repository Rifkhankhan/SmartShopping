import { thunk } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'
import cartSlice from './cartSlice'
import authSlice from './authSlice'

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cart: cartSlice,
		auth: authSlice
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(thunk).concat(apiSlice.middleware),

	devTools: true
})
