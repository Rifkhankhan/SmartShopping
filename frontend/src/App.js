import './App.css'
import Header from './Components/Header/Header'
import { Container } from 'react-bootstrap'

import { Outlet } from 'react-router-dom'

function App() {
	return (
		<>
			<Header />
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>

			{/* <Footer /> */}
		</>
	)
}

export default App
