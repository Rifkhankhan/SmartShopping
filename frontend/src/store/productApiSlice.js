import { apiSlice } from './apiSlice'
import { PRODUCTS_URL, UPLOAD_URL } from '../constants'

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: PRODUCTS_URL,
				params: {
					keyword,
					pageNumber
				}
			}),
			keepUnusedDataFor: 5,
			providesTags: ['Product']
		}),
		getTopProducts: builder.query({
			query: () => ({
				url: `${PRODUCTS_URL}/top`
			}),
			keepUnusedDataFor: 5,
			providesTags: ['Product']
		}),
		getProduct: builder.query({
			query: id => ({
				url: `${PRODUCTS_URL}/${id}`
			}),
			keepUnusedDataFor: 5
		}),

		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCTS_URL,
				method: 'POST'
			}),
			keepUnusedDataFor: 5,
			invalidatesTags: ['Product']
		}),
		updateProduct: builder.mutation({
			query: data => ({
				url: `${PRODUCTS_URL}/${data._id}`,
				method: 'PUT',
				body: data
			}),
			keepUnusedDataFor: 5,
			invalidatesTags: ['Product']
		}),
		upload: builder.mutation({
			query: data => ({
				url: UPLOAD_URL,
				method: 'POST',
				body: data
			}),
			keepUnusedDataFor: 5
		}),
		deleteProduct: builder.mutation({
			query: id => ({
				url: `${PRODUCTS_URL}/${id}`,
				method: 'DELETE'
			}),
			keepUnusedDataFor: 5
		}),
		review: builder.mutation({
			query: data => ({
				url: `${PRODUCTS_URL}/${data.id}/review`,
				method: 'POST',
				body: data
			}),
			keepUnusedDataFor: 5,
			invalidatesTags: ['Product']
		})
	})
})

export const {
	useGetProductsQuery,
	useGetProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadMutation,
	useDeleteProductMutation,
	useReviewMutation,
	useGetTopProductsQuery
} = productsApiSlice
