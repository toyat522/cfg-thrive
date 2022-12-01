import React from 'react'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {

	const navigate = useNavigate()

	const clientInfo = <ClientInfo name="John Doe" dob="03/19/2004" phone="9075381519" address="500 Memorial Drive, Cambridge, MA, 02139" gender="male" race="Asian" />

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

				<label htmlFor="dob">DOB of client (mm/dd/yyyy)</label><br />
				<input type="text" id="dob" name="dob" /><br />

				<input className="accent-button" type="submit" value="Confirm" />
			</form><br />

			<div style={{margin: '1.5rem'}}>
				{clientInfo}
			</div>

		</>
	)
}

const ClientInfo = props => {
	return (
		<>	
			<h4>Client Information:</h4>
			<p>{`Name: ${props.name}`}</p>
			<p>{`Date of birth: ${props.dob}`}</p>
			<p>{`Gender: ${props.gender}`}</p>
			<p>{`Race: ${props.race}`}</p>
			<p>{`Primary phone: ${props.phone}`}</p>
			<p>{`Home address: ${props.address}`}</p>
		</>
	)
}

export default Confirmation;
