import React from 'react'
import { useNavigate } from 'react-router-dom'

const Stats = () => {

	const navigate = useNavigate()

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

const ClinetInfo = props => {
	return (
		<>	
		</>
	)
}

export default Stats;
