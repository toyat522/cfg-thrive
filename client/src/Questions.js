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

				<label htmlFor="date">Date of file creation (mm/dd/yyyy)</label><br />
				<input type="text" id="date" name="date" /><br />

				<label htmlFor="name">Name</label><br />
				<input type="text" id="name" name="name" /><br />

				<label htmlFor="birthdate">Date of birth (mm/dd/yyyy)</label><br />
				<input type="text" id="birth" name="birth" /><br />

				<label htmlFor="phoneno">Phone number</label><br />
				<input type="text" id="phoneno" name="phoneno" /><br />

				<label htmlFor="address">Home address</label><br />
				<input type="text" id="address" name="address" /><br />

				<label>Gender</label><br />
				<input type="radio" id="gender" name="gender" value="M" />
				<label htmlFor="gender_m" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Male</label>
				<input type="radio" id="gender_f" name="gender" value="F" />
				<label htmlFor="gender_f" style={{margin: '0 2rem 0 0.3rem', fontSize: '1rem'}}>Female</label>
				<input type="radio" id="gender_o" name="gender" value="O" />
				<label htmlFor="gender_o" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Other</label><br /><br />

				<label>Autism spectrum diagnosis?</label><br />
				<input type="radio" id="autism_y" name="autism" value="Yes" />
				<label htmlFor="autism_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input type="radio" id="autism_n" name="autism" value="No" />
				<label htmlFor="autism_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

				<label>Does individual have co-occuring medical condition impairing one or more life function?</label><br />
				<input type="radio" id="life_func_y" name="life_func" value="Yes" />
				<label htmlFor="life_func_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input type="radio" id="life_func_n" name="life_func" value="No" />
				<label htmlFor="life_func_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

				<label>Race (may choose multiple)</label><br />
				<input type="checkbox" id="race_white" name="race" value="white" />
				<label htmlFor="race_white" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>White</label><br /><br />
				<input type="checkbox" id="race_black" name="race" value="black" />
				<label htmlFor="race_black" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Black or African American</label><br /><br />
				<input type="checkbox" id="race_aian" name="race" value="aian" />
				<label htmlFor="race_aian" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>American Indian or Alaskan Native</label><br /><br />
				<input type="checkbox" id="race_asian" name="race" value="asian" />
				<label htmlFor="race_asian" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Asian American</label><br /><br />
				<input type="checkbox" id="race_pi" name="race" value="pi" />
				<label htmlFor="race_pi" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Native Hawaiian or other Pacific Islander</label><br /><br />
				<input type="checkbox" id="race_other" name="race" value="other" />
				<label htmlFor="race_other" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Other</label><br /><br />

				<label>Service(s) received</label><br />
				<input type="checkbox" id="nav" name="service" value="nav" />
				<label htmlFor="nav" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Navigation</label><br /><br />
				<input type="checkbox" id="intense_nav" name="service" value="intense_nav" />
				<label htmlFor="intense_nav" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Intensive service navigation</label><br /><br />
				<input type="checkbox" id="flex_fund" name="service" value="flex_fund" />
				<label htmlFor="flex_fund" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Flexible funding</label><br /><br />
				<input type="checkbox" id="group_act" name="service" value="group_act" />
				<label htmlFor="group_act" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Participation in small group/support activities</label><br /><br />
				<input type="checkbox" id="indiv_consult" name="service" value="indiv_consult" />
				<label htmlFor="indiv_consult" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Individual consoltation</label><br /><br />
				<input type="checkbox" id="group_consult" name="service" value="group_consult" />
				<label htmlFor="group_consult" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Small group consultation</label><br /><br />

				<label>Service goals</label><br /><br /> 
				{goals}
				<button
					type="button"
					style={{margin: '0.5rem 0.5rem 2rem'}}
					onClick={() => setNumGoals(numGoals + 1)}
					>
					Add new goal
				</button><br />

				<label htmlFor="date_term">Date services terminated</label><br />
				<input type="text" id="date_term" name="date_term" /><br />

				<label>Individual/Family not responsive to contact?</label><br />
				<input type="radio" id="responsive_y" name="responsive" value="Yes" />
				<label htmlFor="responsive_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input type="radio" id="responsive_n" name="responsive" value="No" />
				<label htmlFor="responsive_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

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
