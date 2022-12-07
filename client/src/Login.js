import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {

	const [username, setUserName] = useState()
	const [password, setPassword] = useState()

	const navigate = useNavigate()

	// Check if client has login credentials to access page
	const auth = async () => {

	  	try {

			const res = await axios.get('/login', { auth: { username: username, password: password } })

			sessionStorage.setItem('token', JSON.stringify({username: username, password: password}))

			alert("Success! Redirecting to home page")
			navigate('/')

	  	} catch (e) {
			alert("Authentication failed")
	  	}

	};

	return (
		<>
			<button
				className="muted-button"
				onClick={()=>navigate('/')}
				style={{margin: '1rem 1rem 1rem'}}>
				Back to home
			</button>
			<div style={{margin: '1rem 1rem 1rem'}}>
				<form>
					<label>
						<p>Username</p>
						<input type="text" onChange={e => setUserName(e.target.value)} />
					</label>
					<label>
						<p>Password</p>
						<input type="password" onChange={e => setPassword(e.target.value)} />
					</label>
					<button type="button" onClick={auth}>Login</button>
				</form>
			</div>
		</>
	)

}

export default Login;
