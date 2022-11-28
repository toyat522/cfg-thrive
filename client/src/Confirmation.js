import React from 'react'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {

	const navigate = useNavigate()

	return (
		<>
			<button
				className="muted-button"
				onClick={()=>navigate('/')}
				style={{margin: '1rem 1rem 1rem'}}>
				Back to home
			</button>

			<form style={{margin: '1.5rem'}}>

				<label htmlFor="name">Name of client</label><br />
				<input type="text" id="name" name="name" /><br />

				<label htmlFor="dob">DOB of client (mm/dd/yy)</label><br />
				<input type="text" id="dob" name="dob" /><br />

				<input className="accent-button" type="submit" value="Confirm" />
			</form><br />

			<div style={{margin: '1.5rem'}}>
				<h4>Client information not found</h4>
			</div>
		</>
	)
}

export default Confirmation;
