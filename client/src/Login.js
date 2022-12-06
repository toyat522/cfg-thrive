import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {

	const [username, setUserName] = useState()
	const [password, setPassword] = useState()

	const navigate = useNavigate()

	const auth = async () => {
	  	try {
			const res = await axios.get('/login', { auth: { username: username, password: password } })
			console.log(res.data)
			alert("Success! Redirecting to home page")
			navigate('/')
	  	} catch (e) {
			alert("Authentication failed")
	  	}
	};

	return (
		<div className="login-wrapper" style={{margin: '1rem 1rem 1rem'}}>
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
	)

}

export default Login;
