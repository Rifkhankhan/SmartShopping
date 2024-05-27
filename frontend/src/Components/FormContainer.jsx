import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({ children }) => {
	return (
		<Container className="my-auto">
			<Row className="justify-content-md-center align-items-md-center">
				<Col xs={12} md={6}>
					{children}
				</Col>
			</Row>
		</Container>
	)
}

export default FormContainer
