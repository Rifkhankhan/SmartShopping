import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({ children, md }) => {
	return (
		<Container className="my-auto">
			<Row className="justify-content-md-center ">
				<Col md={12}>{children}</Col>
			</Row>
		</Container>
	)
}

export default FormContainer
