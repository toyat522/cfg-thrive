import { React }from 'react'
import { useNavigate } from 'react-router-dom'

// Home page (path: /)
const Home = () => {

	// For navigating between webpages
	const navigate = useNavigate()

	return (
		<>
			<div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '1.5rem'}}>
				<img src={(require('./img/TandSLogo.jpg'))} width='400' alt="Thrive and Support Logo" />
			</div>
			<button
				onClick={()=>navigate('/passwords')}
				style={{position: 'absolute', top: '1rem', right: '15rem'}}>
				Change Passwords
			</button>

			<button
				onClick={()=>navigate('/login')}
				style={{position: 'absolute', top: '1rem', right: '8rem'}}>
				Login
			</button>
			<button
				onClick={() => {
					sessionStorage.removeItem('token')
                    alert("User sucessfully logged out")
                }}
				style={{position: 'absolute', top: '1rem', right: '0.5rem'}}>
				Logout
			</button>
			<div className="buttons" style={{textAlign: 'center'}}>
				<button onClick={()=>navigate('/questions', {state: {newClient: true, id: ""}})}>New Client</button>
				<button onClick={()=>navigate('/confirm', {state: {fromEdit: true}})}>Add/Edit Client</button>
				<button onClick={()=>navigate('/confirm', {state: {fromEdit: false}})}>Activate/Inactivate Client</button>
				<button onClick={()=>navigate('/stats')}>Summary</button>
			</div>
		</>
	)

}

export default Home;
