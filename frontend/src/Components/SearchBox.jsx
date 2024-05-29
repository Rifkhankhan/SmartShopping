import React, { useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

const SearchBox = () => {
	const navigate = useNavigate()
	const { keyword: urlKeyword } = useParams()
	const [searchClick, setSearchClick] = useState(false)
	const [keyword, setKeyword] = useState(urlKeyword)

	const submitHandler = e => {
		e.preventDefault()

		if (keyword?.trim()) {
			navigate(`/search/${keyword}`)
		} else {
			navigate('/')
		}
	}

	const clickHandler = e => {
		setSearchClick(currnt => !currnt)
	}

	const closeSearchHandler = () => {
		setKeyword('')
		navigate('/')
	}

	return (
		<>
			{!searchClick && (
				<Button variant="outline" c>
					<FaSearch
						className="text-light me-auto my-md-auto"
						onClick={clickHandler}
					/>
				</Button>
			)}
			{searchClick && (
				<Form className="d-flex" onSubmit={submitHandler}>
					<div className="input-container d-flex align-items-center position-relative">
						<Form.Control
							type="text"
							name="search"
							onChange={e => setKeyword(e.target.value)}
							value={keyword}
							placeholder="Search Product"
						/>
						{keyword && (
							<FaTimes
								className="text-danger clear-icon"
								style={{
									position: 'absolute',
									right: '10px',
									cursor: 'pointer'
								}}
								onClick={closeSearchHandler}
							/>
						)}
					</div>
					<Button
						type="submit"
						variant="outline-light"
						className="text-light ms-1 px-2">
						Search
					</Button>
				</Form>
			)}
		</>
	)
}

export default SearchBox
