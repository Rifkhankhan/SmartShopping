import './App.css'
import Header from './Components/Header/Header'
import { Container } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
	return (
		<>
			<Header />
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>

			<ToastContainer />

			{/* <Footer /> */}
		</>
	)
}

export default App
