import { apiSlice } from './apiSlice'
import { USERS_URL } from '../constants'

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/login`,
				method: 'POST',

				body: data
			}),
			keepUnusedDataFor: 5
		}),
		register: builder.mutation({
			query: data => ({
				url: `${USERS_URL}`,
				method: 'POST',

				body: data
			}),
			keepUnusedDataFor: 5
		}),
		logout: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/logout`,

				method: 'POST'
			}),
			keepUnusedDataFor: 5
		}),
		profile: builder.query({
			query: () => ({
				url: `${USERS_URL}/profile`
			}),
			keepUnusedDataFor: 5
		}),
		updateProfile: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data
			}),
			keepUnusedDataFor: 5
		})
	})
})

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useProfileQuery,
	useUpdateProfileMutation
} = usersApiSlice
