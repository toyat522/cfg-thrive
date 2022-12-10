import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Confirmation = () => {

	const navigate = useNavigate()
	const location = useLocation()

	// Fetch data	
 	const [records, setRecords] = useState([]);
 	useEffect(() => {
   		async function getRecords() {
     		const response = await fetch(`http://localhost:5000/record/`);
 
			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
	 
			const records = await response.json();
			setRecords(records);
		}
 
   		getRecords();
 
   		return;
 	}, [records.length]);	 

	// Check if client has login credentials to access page
	const auth = async () => {
		try {

			const res = await axios.get('/login', { auth: JSON.parse(sessionStorage.getItem('token')) })
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

	const [isInfoShown, setIsInfoShown] = useState(false)
	const [data, setData] = useState({ 
		name: "", 
		birth: "",
		phoneno: "",
		address: "",
		gender: "",
		race: "",
		active: true
	})

	function getClientInfo() {

		const nameText = document.getElementById("name")
		const dobText = document.getElementById("dob")
		let isFound = false
		for (let i = 0; i < records.length; i++) {

			if (records[i].name == nameText.value && records[i].birth == dobText.value) {

				isFound = true
				setData(records[i])
				setIsInfoShown(true)
				break

			}

		}

		if (!isFound) {
			alert("Could not find specified client")
		}

	}

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

	const navigate = useNavigate()

	const AskConfirm = () => {

		async function activate() {

			const person = props.data
			person.active = true

			await fetch(`http://localhost:5000/update/${person._id}`, {
			 	method: "POST",
			 	body: JSON.stringify(person),
			 	headers: {
			   		'Content-Type': 'application/json'
			 	},
		   	});
				
			alert("Client was successfully activated")
			navigate('/')

		}

		async function inactivate() {

			const person = props.data
			person.active = false

			await fetch(`http://localhost:5000/update/${props.data._id}`, {
			 	method: "POST",
			 	body: JSON.stringify({active: false}),
			 	headers: {
			   		'Content-Type': 'application/json'
			 	},
		   	});
	
			alert("Client was successfully inactivated")
			navigate('/')

		}

		if (props.fromEdit) {

			return (
				<>
					<button onClick={()=>{navigate('/questions', {state: {newClient: false}})}}>Edit Client</button>
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
		return(<></>)
	}

}

export default Confirmation;
