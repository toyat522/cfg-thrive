import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

	const navigate = useNavigate()

	return (
		<>
			<div style={{textAlign: 'center', marginTop: '1rem', marginBottom: '1.5rem'}}>
				<img src={(require('./img/TandSLogo.jpg'))} width='400' alt="Thrive and Support Logo" />
			</div>
			<button 
				onClick={()=>{alert("not implemented :(")}}
				style={{position: 'absolute', top: '1rem', right: '0.5rem'}}>
				Login
			</button>
			<div className="buttons" style={{textAlign: 'center'}}>
				<button onClick={()=>navigate('/questions')}>New Client</button>
				<button onClick={()=>navigate('/confirm')}>Add/Edit</button>
				<button onClick={()=>navigate('/confirm')}>Activate/Inactivate Client</button>
				<button onClick={()=>navigate('/stats')}>Summary</button>
			</div>
		</>
	)

}

export default Home;
