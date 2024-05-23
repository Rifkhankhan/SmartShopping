import React from 'react'
import { Navbar, Container, Nav, Badge } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
const Header = () => {
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
										2
									</Badge>
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/">
								<Nav.Link href="/" className="text-light">
									<FaUser /> Signin
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
