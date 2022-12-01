import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Questions = () => {

	const navigate = useNavigate()

	const [numGoals, setNumGoals] = useState(0)
	const goals = [];

	for (let i = 0; i < numGoals; i += 1) {
		goals.push(<GoalElement key={i + 1} number={i + 1} />)
	}

	return (
		<>
			<button
				className="muted-button"
				onClick={()=>navigate('/')}
				style={{margin: '1rem 1rem 1rem'}}>
				Back to home
			</button>

			<form style={{margin: '1.5rem'}}>

				<label htmlFor="date">Date of file creation</label><br />
				<input type="text" id="date" name="date" /><br />

				<label htmlFor="name">Name</label><br />
				<input type="text" id="name" name="name" /><br />

				<label htmlFor="birthdate">Birthdate</label><br />
				<input type="text" id="birthdate" name="birthdate" /><br />

				<label htmlFor="phoneno">Phone Number</label><br />
				<input type="text" id="phoneno" name="phoneno" /><br />

				<label htmlFor="address">Address</label><br />
				<input type="text" id="address" name="address" /><br />

				<label>Autism spectrum diagnosis?</label><br />
				<input type="checkbox" id="autism_y" name="autism_y" value="Yes" />
				<label htmlFor="autism_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input type="checkbox" id="autism_n" name="autism_n" value="No" />
				<label htmlFor="autism_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

				<label>Does individual have co-occuring medical condition impairing one or more life function?</label><br />
				<input type="radio" id="life_func_y" name="life_func" value="Yes" />
				<label htmlFor="life_func_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input type="radio" id="life_func_n" name="life_func" value="No" />
				<label htmlFor="life_func_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

				<label>Autism spectrum diagnosis?</label><br />
				<input type="checkbox" id="autism_y" name="autism_y" value="Yes" />
				<label htmlFor="autism_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input type="checkbox" id="autism_n" name="autism_n" value="No" />
				<label htmlFor="autism_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

				<label>Autism spectrum diagnosis?</label><br />
				<input type="checkbox" id="autism_y" name="autism_y" value="Yes" />
				<label htmlFor="autism_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input type="checkbox" id="autism_n" name="autism_n" value="No" />
				<label htmlFor="autism_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

				<label>Service goals</label><br /><br /> 
				{goals}
				<button
					type="button"
					style={{margin: '0.5rem 0.5rem 2rem'}}
					onClick={() => setNumGoals(numGoals + 1)}
					>
					Add new goal
				</button><br />

				<label htmlFor="name">Date of file creation</label><br />
				<input type="text" id="name" name="name" /><br />

				<label htmlFor="name">Date of file creation</label><br />
				<input type="text" id="name" name="name" /><br />

				<input className="accent-button" type="submit" value="Submit" />

			</form>
		</>
	)
}

const GoalElement = props => {
	return (
		<>	
			<label htmlFor={`goal${props.number}`} style={{fontSize:'1.2rem'}}>{`Goal ${props.number}`}</label><br />
			<textarea id={`goal${props.number}`} name={`goal${props.number}`} />

			<label style={{fontSize: '1rem', margin: '0 2rem 0 0rem'}}>Goal met?</label>
			<input type="radio" id={`goal_met_y${props.number}`} name={`goal_met${props.number}`} value="Yes" />
			<label htmlFor="goal_met_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
			<input type="radio" id={`goal_met_n${props.number}`} name={`goal_met${props.number}`} value="No" />
			<label htmlFor={`goal_met_n${props.number}`} style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>No</label><br /><br />
		
			<label htmlFor={`goal_met_date${props.number}`} style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Date met (leave blank if not applicable)</label>
			<input type="text" id={`goal_met_date${props.number}`} name="" /><br /><br />
		</>
	)
}

export default Questions;
