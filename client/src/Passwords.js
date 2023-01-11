import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

// Login page to authenticate user
const Passwords = () => {

    // States to set entered username and password
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()

    // For navigating between webpages
    const navigate = useNavigate()

    // Check if client has login credentials to access page
    const auth = async () => {

        try {

            // Checks if username and password are correct
            await axios.post('/login', {
                username: username,
                password: password
            })

            // If it is correct, then create an 'authentication token' in the session storage
            sessionStorage.setItem('token', JSON.stringify({ username: username, password: password }))

            // Redirect to home page
            alert("Success! Redirecting to home page")
            navigate('/')

        } catch (e) {

            // Error message to show when authentication failed
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

export default Passwords;
