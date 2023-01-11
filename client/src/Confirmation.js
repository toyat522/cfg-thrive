import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

// Confirmation page to edit/activate/inactivate client (path: /confirm)
const Confirmation = () => {

    // For navigating between webpages
	const navigate = useNavigate()
	const location = useLocation()

	// Fetch data	
 	const [records, setRecords] = useState([]);
 	useEffect(() => {
   		async function getRecords() {

     		let response = await fetch(`http://cfg-thrive.herokuapp.com/record/`);

            // Error message
			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}

            // Set records to fetched data
			const records = await response.json();
			setRecords(records);

		}
   		getRecords();
 
   		return;
 	}, [records.length]);	 

	// Check if client has login credentials in session storage to access page
	const auth = async () => {

		try {

			const res = await axios.post('/login', JSON.parse(sessionStorage.getItem('token')))
			if (location.state.fromEdit && !(res.data === 'authorized' || res.data === 'standard')) {
				navigate('/login')
			} else if (!location.state.fromEdit && res.data !== 'authorized') {
				navigate('/login')
			} else if (res.data === 'view') {
				navigate('/login')
			}

		} catch (e) {
			navigate('/login')
		}

	}
	auth()

    // State to determine whether client information is shown
	const [isInfoShown, setIsInfoShown] = useState(false)

    // State for shown client data
	const [data, setData] = useState({ 
		name: "", 
		birth: "",
		phoneno: "",
		address: "",
		gender: "",
		race: "",
		active: true
	})

    // Get client information based on his/her name and date of birth
	function getClientInfo() {

		const nameText = document.getElementById("name")
		const dobText = document.getElementById("dob")

        // Iterate through MongoDB records until it finds a match
		let isFound = false
		for (let i = 0; i < records.length; i++) {

			if (records[i].name === nameText.value && records[i].birth === dobText.value) {

				isFound = true
				setData(records[i])
				setIsInfoShown(true)
				break

			}

		}

        // Error message for when client information is not found
		if (!isFound) {
			alert("Could not find specified client")
		}

	}

    // ClientInfo is empty if isInfo is False. Otherwise, it shows the client information.
	const clientInfo = <ClientInfo fromEdit={location.state.fromEdit} isInfo={isInfoShown} data={data} />

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

    // For navigating between webpages
	const navigate = useNavigate()

    // AskConfirm returns different DOM elements (edit/inactivate/activate client) based on how the user got to this webpage
	const AskConfirm = () => {

        // Activate client by setting 'active' to true
		async function activate() {

			await fetch(`http://cfg-thrive.herokuapp.com/update/${props.data._id}`, {
				method: "POST",
				body: JSON.stringify({active: true}),
				headers: {
					'Content-Type': 'application/json'
				},
			});

			alert("Client was successfully activated")
			navigate('/')

		}

        // Inactivate client by setting 'active' to false
		async function inactivate() {

			await fetch(`http://cfg-thrive.herokuapp.com/update/${props.data._id}`, {
				method: "POST",
				body: JSON.stringify({active: false}),
				headers: {
					'Content-Type': 'application/json'
				},
			});

			alert("Client was successfully inactivated")
			navigate('/')

		}

        // Return different elements based on the value of fromEdit
		if (props.fromEdit) {

			return (
				<>
					<button onClick={()=>{navigate('/questions', {state: {newClient: false, id: props.data._id}})}}>Edit Client</button>
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

        // If isInfo is true, show client information and AskConfirm button
		return (
			<>	
				<h4>Client Information:</h4>
				<p>{`Activated?: ${props.data.active}`}</p>
				<p>{`Name: ${props.data.name}`}</p>
				<p>{`Date of birth: ${props.data.birth}`}</p>
				<p>{`Gender: ${props.data.gender}`}</p>
				<p>{`Race: ${props.data.race}`}</p>
				<p>{`Primary phone: ${props.data.phoneno}`}</p>
				<p>{`Home address: ${props.data.address}`}</p>
				<AskConfirm />
			</>
		)

	} else {

        // Otherwise, return an empty element
		return(<></>)

	}

}

export default Confirmation;
