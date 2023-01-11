import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const bcrypt = require("bcryptjs")

// Login page to authenticate user
const Passwords = () => {

    // For navigating between webpages
    const navigate = useNavigate()

    // Check if client has login credentials in session storage to access page
    const auth = async () => {

        try {

            const res = await axios.post('/login', JSON.parse(sessionStorage.getItem('token')))
            if (res.data !== 'authorized') {
                navigate('/login')
            }

        } catch (e) {
            navigate('/login')
        }

    }
    auth()

    // Activate client by setting 'active' to true
    async function updatePass(user) {

        try {

            let pass = prompt("Enter new password")
            pass = await bcrypt.hash(pass, 10);
            if (pass) {

                console.log(JSON.stringify({password: pass}))
                await fetch(`http://cfg-thrive.herokuapp.com/updatepassword/${user}`, {
                    method: "POST",
                    body: JSON.stringify({password: pass}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                alert("Password was successfully changed")
                navigate('/')

            }

        } catch(e) {
            alert("Password change failed")
        }

    }

    return (
        <>
            <button
                className="muted-button"
                onClick={()=>navigate('/')}
                style={{margin: '1rem 1rem 1rem'}}>
                Back to home
            </button>

            <div style={{margin: '1rem 1rem 1rem'}}>
                <h3>Users:</h3>
                <h4>Authorized</h4>
                <button type="button" onClick={()=>{updatePass("authorized")}}>Change password</button>
                <h4>Standard</h4>
                <button type="button" onClick={()=>{updatePass("standard")}}>Change password</button>
                <h4>View</h4>
                <button type="button" onClick={()=>{updatePass("view")}}>Change password</button>
            </div>
        </>
    )

}

export default Passwords;
