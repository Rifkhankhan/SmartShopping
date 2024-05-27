import React from 'react'
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../../store/userApiSlice'
import { logout } from './../../store/authSlice'
const Header = () => {
	const cardItems = useSelector(state => state.cart.cardItems)
	const { userInfo } = useSelector(state => state.auth)
	const [logoutApi] = useLogoutMutation()
	const dispatch = useDispatch()
	const logoutHandler = async () => {
		try {
			await logoutApi().unwrap()
			dispatch(logout())
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>SmartShopping</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/cart">
								<Nav.Link href="/" className="text-light">
									<FaShoppingCart /> Cart
									<Badge pill bg="success" style={{ marginLeft: '5px' }}>
										{cardItems.length}
									</Badge>
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title="Rifkhan" id="username">
									<LinkContainer to="/profile" className="text-light">
										<NavDropdown.Item className="text-dark">
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/" className="text-light">
										<NavDropdown.Item
											className="text-dark"
											onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link className="text-light">
										<FaUser /> Signin
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
