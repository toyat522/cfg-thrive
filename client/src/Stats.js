import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Stats = () => {

	const navigate = useNavigate()

	// Need to be authenticated to access webpage
	const auth = async () => {
		try {
			const res = await axios.get('/login', { auth: JSON.parse(sessionStorage.getItem('token')) })
		} catch (e) {
			navigate('/login')
		}
	}
	auth()

	return (
		<>
			<button
				className="muted-button"
				onClick={()=>navigate('/')}
				style={{margin: '1rem 1rem 1rem'}}>
				Back to home
			</button>
		</>
	)
}

export default Stats;
