import { apiSlice } from './apiSlice'
import { ORDERS_URL, PAYPAL_URL } from '../constants'

export const ordersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		createOrder: builder.mutation({
			query: data => ({
				url: ORDERS_URL,
				method: 'POST',
				body: { ...data }
			}),
			keepUnusedDataFor: 5
		}),
		getOrders: builder.query({
			query: () => ({
				url: ORDERS_URL
			}),
			keepUnusedDataFor: 5
		}),
		getOrderById: builder.query({
			query: id => ({
				url: `${ORDERS_URL}/${id}`
			}),
			keepUnusedDataFor: 5
		}),
		payOrder: builder.mutation({
			query: ({ id, details }) => ({
				url: `${ORDERS_URL}/${id}/pay`,
				method: 'PUT',
				body: { ...details }
			}),
			keepUnusedDataFor: 5
		}),
		deiverOrder: builder.mutation({
			query: id => ({
				url: `${ORDERS_URL}/${id}/deliver`,
				method: 'PUT'
			}),
			keepUnusedDataFor: 5
		}),
		getPayPalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL
			}),
			keepUnusedDataFor: 5
		}),
		getMyOrders: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/mine`
			}),
			keepUnusedDataFor: 5
		})
	})
})

export const {
	useCreateOrderMutation,

	useGetOrdersQuery,
	useGetOrderByIdQuery,
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
	useGetMyOrdersQuery,
	useDeiverOrderMutation
} = ordersApiSlice
