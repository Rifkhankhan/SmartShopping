import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
const Rating = ({ value, text }) => {
	return (
		<div>
			<span>
				{value >= 1 ? (
					<FaStar color="yellow" />
				) : value >= 0.5 ? (
					<FaStarHalfAlt color="yellow" />
				) : (
					<FaRegStar />
				)}
			</span>
			<span>
				{value >= 2 ? (
					<FaStar color="yellow" />
				) : value >= 1.5 ? (
					<FaStarHalfAlt color="yellow" />
				) : (
					<FaRegStar />
				)}
			</span>

			<span>
				{value >= 3 ? (
					<FaStar color="yellow" />
				) : value >= 2.5 ? (
					<FaStarHalfAlt color="yellow" />
				) : (
					<FaRegStar />
				)}
			</span>

			<span>
				{value >= 4 ? (
					<FaStar color="yellow" />
				) : value >= 3.5 ? (
					<FaStarHalfAlt color="yellow" />
				) : (
					<FaRegStar />
				)}
			</span>

			<span>
				{value >= 5 ? (
					<FaStar color="yellow" />
				) : value >= 4.5 ? (
					<FaStarHalfAlt color="yellow" />
				) : (
					<FaRegStar />
				)}
			</span>

			<span>{text} Reviews</span>
		</div>
	)
}

export default Rating
