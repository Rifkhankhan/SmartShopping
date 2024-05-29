import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { store } from './store'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider
} from 'react-router-dom'
import Home from './Screens/Home/Home'
import ProductDetails from './Screens/ProductDetails'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ShippingScreen from './Screens/ShippingScreen'

import PrivateRoute from './Components/Routes/PrivateRoute'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import OrdersScreen from './Screens/Admin/OrdersScreen'
import ProfileScreen from './Screens/ProfileScreen'
import AdminRoute from './Components/Routes/AdminRoute'
import ProductsListScreen from './Screens/Admin/ProductsListScreen'
import ProductEditScreen from './Screens/Admin/ProductEditScreen'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Home />} />
			<Route path="/product/:id" element={<ProductDetails />} />
			<Route path="/page/:pageNumber" element={<Home />} />
			<Route path="/search/:keyword" element={<Home />} />
			<Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
			<Route path="/cart" element={<CartScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />

			<Route path="" element={<PrivateRoute />}>
				<Route path="/shipping" element={<ShippingScreen />} />
				<Route path="/payment" element={<PaymentScreen />} />
				<Route path="/placeorder" element={<PlaceOrderScreen />} />
				<Route path="/orders/:id" element={<OrderScreen />} />
				<Route path="/profile" element={<ProfileScreen />} />
			</Route>

			<Route path="" element={<AdminRoute />}>
				<Route path="/admin/orders" element={<OrdersScreen />} />
				<Route path="/admin/products" element={<ProductsListScreen />} />
				<Route
					path="/admin/products/page/:pageNumber"
					element={<ProductsListScreen />}
				/>
				<Route
					path="/admin/products/:id/edit"
					element={<ProductEditScreen />}
				/>
			</Route>
		</Route>
	)
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<Provider store={store}>
				<PayPalScriptProvider deferLoading={true}>
					<RouterProvider router={router} />
				</PayPalScriptProvider>
			</Provider>
		</HelmetProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
