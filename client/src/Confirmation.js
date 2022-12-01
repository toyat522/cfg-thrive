import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Confirmation = () => {

	const navigate = useNavigate()
	const location = useLocation()

	const [isInfoShown, setIsInfoShown] = useState(false)

	function getClientInfo() {
		setIsInfoShown(true)
	}

	const clientInfo = <ClientInfo fromEdit={location.state.fromEdit} isInfo={isInfoShown} status="activated" name="John Doe" dob="03/19/2004" phone="9075381519" address="500 Memorial Drive, Cambridge, MA, 02139" gender="male" race="Asian" />

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

				<button onClick={getClientInfo} className="accent-button" type="button">Confirm</button>
			</form><br />

			<div style={{margin: '1.5rem'}}>
				{clientInfo}
			</div>

		</>
	)
}

const ClientInfo = props => {

	const navigate = useNavigate()

	const AskConfirm = () => {

		function activate() {

			alert("Client was successfully activated")
			navigate('/')

		}

		function inactivate() {

			alert("Client was successfully inactivated")
			navigate('/')

		}

		if (props.fromEdit) {

			return (
				<>
					<button onClick={()=>{navigate('/questions')}}>Edit Client</button>
				</>
			)

		} else {

			return (
				<>
					<button onClick={inactivate}>Inactivate Client</button>
					<button onClick={activate}>Activate Client</button>
				</>
			)

		}

	}
	
	if (props.isInfo) {
		return (
			<>	
				<h4>Client Information:</h4>
				<p>{`Status: ${props.status}`}</p>
				<p>{`Name: ${props.name}`}</p>
				<p>{`Date of birth: ${props.dob}`}</p>
				<p>{`Gender: ${props.gender}`}</p>
				<p>{`Race: ${props.race}`}</p>
				<p>{`Primary phone: ${props.phone}`}</p>
				<p>{`Home address: ${props.address}`}</p>
				<AskConfirm />
			</>
		)
	} else {
		return(<></>)
	}

}

export default Confirmation;
