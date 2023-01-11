import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const env = process.env.NODE_ENV

const Questions = () => {

    // For navigating between webpages
	const navigate = useNavigate()
	const location = useLocation()

	// Fetch data	
 	const [records, setRecords] = useState([]);
 	useEffect(() => {
   		async function getRecords() {

     		let response;

			// If environment is production, get data from cfg-thrive webpage)
            if (env === 'production') {
                response = await fetch(`http://cfg-thrive.herokuapp.com/record/`);
            } else {
                response = await fetch(`http://localhost:5000/record/`);
            }

			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
	 
			const records = await response.json();
			setRecords(records);

		}
   		getRecords();

		// If editing client, update data
		if (!location.state.newClient) {
			for (let i = 0; i < records.length; i++) {
				if (records[i]._id === location.state.id) {
					const curr = records[i]

					// Update form except goals
					updateForm({
						date: curr.date,
						name: curr.name,
						birth: curr.birth,
						address: curr.address,
						phoneno: curr.phoneno,
						gender: curr.gender,
						autism: curr.autism,
						life_func: curr.life_func,
						race: curr.race,
						service: curr.service,
						date_term: curr.date_term,
						responsive: curr.responsive,
						num_goals: curr.num_goals,
						active: curr.active
					})

					// Iterate through goals and update the form object to send to MongoDB
					setNumGoals(parseInt(curr.num_goals))
					for (let i = 0; i < parseInt(curr.num_goals); i++) {
						form["goal" + (i + 1)] = curr["goal" + (i + 1)]
						form["goal_met_y" + (i + 1)] = curr["goal_met_y" + (i + 1)]
						form["goal_met_date" + (i + 1)] = curr["goal_met_date" + (i + 1)]
					}
				}
			}
		}

   		return;
 	}, [records.length]);	 

	// Check if client has login credentials to access page
	const auth = async () => {

		try {

			const res = await axios.post('/login', JSON.parse(sessionStorage.getItem('token')))
			if (location.state.newClient && res.data !== 'authorized') {
				navigate('/login')
			} else if (res.data === 'view') {
				navigate('/login')
			}

		} catch (e) {
			navigate('/login')
		}

	}
	auth()

    // State that contains the number of goals
	const [numGoals, setNumGoals] = useState(0)

    // Array that contains all the goals
	const goals = [];

	// Form object to send to DB
	const [form, setForm] = useState({
		date: "",
		name: "",
		birth: "",
		address: "",
		phoneno: "",
		gender: "",
		autism: "",
		life_func: "",
		race: [],
		service: [],
		date_term: "",
		responsive: "",
		num_goals: 0,
		active: true
	})

	// Update values for race
	function updateRaces() {
		let selected = []
		let chks = document.getElementsByName("race")
		for (let i = 0; i < chks.length; i++) {
			if (chks[i].checked) {
				selected.push(chks[i].value)
			}
		}
		updateForm({race: selected})
	}
	
	// Update values for service
	function updateServices() {
		let selected = []
		let chks = document.getElementsByName("service")
		for (let i = 0; i < chks.length; i++) {
			if (chks[i].checked) {
				selected.push(chks[i].value)
			}
		}
		updateForm({service: selected})
	}

	// Update values for goals
	function updateGoals() {
		for (let i = 0; i < goals.length; i++) {
			const goal_desc = document.getElementById("goal" + (i + 1))
			const goal_met_y = document.getElementById("goal_met_y" + (i + 1))	
			const goal_date = document.getElementById("goal_met_date" + (i + 1))
			form["goal" + (i + 1)] = goal_desc.value
			form["goal_met_y" + (i + 1)] = goal_met_y.checked
			form["goal_met_date" + (i + 1)] = goal_date.value
		}
	}

	// Add the list of goals
	for (let i = 0; i < numGoals; i += 1) {
		goals.push(<GoalElement key={i + 1} number={i + 1} />)
	}
	
	// Function to be called every time form is updated
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value }
		})
	}

	// Function to be called when the submit button is clicked
	async function onSubmit(e) {

		e.preventDefault();
		updateGoals()
	 
		// When a post request is sent to the create url, we'll add a new record to the database.
		const data = { ...form };

		if (location.state.newClient) {

            // If a new client is being made, add a new document to MongoDB

            if (env === 'production') {

				// If environment is production, get data from cfg-thrive webpage)
                await fetch("http://cfg-thrive.herokuapp.com/record/add", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				})
				.catch(error => {
					window.alert(error);
					return;
				})

            } else {

				// If environment is not in production, get data from localhost)
                await fetch("http://localhost:5000/record/add", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				})
				.catch(error => {
					window.alert(error);
					return;
				})

            }

		} else {

			// If a previously made client is being updated, update the corresponding document

            if (env === 'production') {

				// If environment is production, get data from cfg-thrive webpage)
				await fetch(`http://cfg-thrive.herokuapp.com/update/${location.state.id}`, {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					},
				})

            } else {

				// If environment is not in production, get data from localhost)
				await fetch(`http://localhost:5000/update/${location.state.id}`, {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					},
				})

            }

		}

        // Navigate to the home page after updating DB
		alert("Client was successfully added to the database")
	   	navigate("/");

	}

	// Once goals are rendered, add their descriptions (only once)
	const [descAdded, setDescAdded] = useState(false)
	const goalsDiv = document.getElementById("goals")
	if (!descAdded && goalsDiv != null && goalsDiv.children.length !== 0 && !location.state.newClient) {
		setDescAdded(true)

		for (let i = 0; i < numGoals; i++) {

			document.getElementById("goal" + (i + 1)).value = form["goal" + (i + 1)]
			document.getElementById("goal_met_y" + (i + 1)).checked = form["goal_met_y" + (i + 1)]
			document.getElementById("goal_met_n" + (i + 1)).checked = !form["goal_met_y" + (i + 1)]
			document.getElementById("goal_met_date" + (i + 1)).value = form["goal_met_date" + (i + 1)]

		}
	}

    // JSX to be rendered
	return (
		<>
			<button
				className="muted-button"
				onClick={()=>navigate('/')}
				style={{margin: '1rem 1rem 1rem'}}>
				Back to home
			</button>

			<form style={{margin: '1.5rem'}} onSubmit={onSubmit}>

				<label htmlFor="date">Date of file creation (mm/dd/yyyy)</label><br />
				<input 
					type="text" 
					id="date" 
					name="date"
					value={form.date}
					onChange={(e) => updateForm({date: e.target.value})}
				/><br />

				<label htmlFor="name">Name</label><br />
				<input 
					type="text" 
					id="name" 
					name="name" 
					value={form.name}
					onChange={(e) => updateForm({name: e.target.value})}
				/><br />

				<label htmlFor="birthdate">Date of birth (mm/dd/yyyy)</label><br />
				<input 
					type="text" 
					id="birth" 
					name="birth" 
					value={form.birth}
					onChange={(e) => updateForm({birth: e.target.value})}
				/><br />

				<label htmlFor="phoneno">Phone number</label><br />
				<input 
					type="text" 
					id="phoneno" 
					name="phoneno" 
					value={form.phoneno}
					onChange={(e) => updateForm({phoneno: e.target.value})}
				/><br />

				<label htmlFor="address">Home address</label><br />
				<input 
					type="text" 
					id="address" 
					name="address" 
					value={form.address}
					onChange={(e) => updateForm({address: e.target.value})}
				/><br />

				<label>Gender</label><br />
				<input 
					type="radio" 
					id="gender" 
					name="gender" 
					value="M"
					checked={form.gender === "M"}
					onChange={(e) => updateForm({gender: e.target.value})}
				/>
				<label htmlFor="gender_m" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Male</label>
				<input 
					type="radio" 
					id="gender_f" 
					name="gender" 
					value="F" 
					checked={form.gender === "F"}
					onChange={(e) => updateForm({gender: e.target.value})}
				/>
				<label htmlFor="gender_f" style={{margin: '0 2rem 0 0.3rem', fontSize: '1rem'}}>Female</label>
				<input 
					type="radio" 
					id="gender_o" 
					name="gender" 
					value="O" 
					checked={form.gender === "O"}
					onChange={(e) => updateForm({gender: e.target.value})}
				/>
				<label htmlFor="gender_o" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Other</label><br /><br />

				<label>Autism spectrum diagnosis?</label><br />
				<input 
					type="radio" 
					id="autism_y" 
					name="autism" 
					value="Yes" 
					checked={form.autism === "Yes"}
					onChange={(e) => updateForm({autism: e.target.value})}
				/>
				<label htmlFor="autism_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input 
					type="radio" 
					id="autism_n" 
					name="autism" 
					value="No" 
					checked={form.autism === "No"}
					onChange={(e) => updateForm({autism: e.target.value})}
				/>
				<label htmlFor="autism_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

				<label>Does individual have co-occuring medical condition impairing one or more life function?</label><br />
				<input 
					type="radio" 
					id="life_func_y" 
					name="life_func" 
					value="Yes" 
					checked={form.life_func === "Yes"}
					onChange={(e) => updateForm({life_func: e.target.value})}
				/>
				<label htmlFor="life_func_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input 
					type="radio" 
					id="life_func_n" 
					name="life_func" 
					value="No" 
					checked={form.life_func === "No"}
					onChange={(e) => updateForm({life_func: e.target.value})}
				/>
				<label htmlFor="life_func_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

				<label>Race (may choose multiple)</label><br />
				<input 
					type="checkbox" 
					id="race_white" 
					name="race" 
					value="White" 
					checked={form.race.includes("White")}
					onChange={() => updateRaces()}
				/>
				<label htmlFor="race_white" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>White</label><br /><br />
				<input 
					type="checkbox" 
					id="race_black" 
					name="race" 
					value="Black" 
					checked={form.race.includes("Black")}
					onChange={() => updateRaces()}
				/>
				<label htmlFor="race_black" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Black or African American</label><br /><br />
				<input 
					type="checkbox" 
					id="race_aian" 
					name="race" 
					value="AIAN" 
					checked={form.race.includes("AIAN")}	
					onChange={() => updateRaces()}
				/>
				<label htmlFor="race_aian" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>American Indian or Alaskan Native</label><br /><br />
				<input 
					type="checkbox" 
					id="race_asian" 
					name="race" 
					value="Asian" 
					checked={form.race.includes("Asian")}
					onChange={() => updateRaces()}
				/>
				<label htmlFor="race_asian" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Asian American</label><br /><br />
				<input 
					type="checkbox" 
					id="race_pi" 
					name="race" 
					value="Pacific Islander" 
					checked={form.race.includes("Pacific Islander")}	
					onChange={() => updateRaces()}
				/>
				<label htmlFor="race_pi" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Native Hawaiian or other Pacific Islander</label><br /><br />
				<input 
					type="checkbox" 
					id="race_other" 
					name="race" 
					value="Other" 
					checked={form.race.includes("Other")}
					onChange={() => updateRaces()}
				/>
				<label htmlFor="race_other" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Other</label><br /><br />

				<label>Service(s) received</label><br />
				<input 
					type="checkbox" 
					id="nav" 
					name="service" 
					value="nav" 
					checked={form.service.includes("nav")}
					onChange={() => updateServices()}
				/>
				<label htmlFor="nav" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Navigation</label><br /><br />
				<input 
					type="checkbox" 
					id="intense_nav" 
					name="service" 
					value="intense_nav" 
					checked={form.service.includes("intense_nav")}
					onChange={() => updateServices()}
				/>
				<label htmlFor="intense_nav" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Intensive service navigation</label><br /><br />
				<input 
					type="checkbox" 
					id="flex_fund" 
					name="service" 
					value="flex_fund" 
					checked={form.service.includes("flex_fund")}
					onChange={() => updateServices()}
				/>
				<label htmlFor="flex_fund" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Flexible funding</label><br /><br />
				<input 
					type="checkbox" 
					id="group_act" 
					name="service" 
					value="group_act" 
					checked={form.service.includes("group_act")}
					onChange={() => updateServices()}
				/>
				<label htmlFor="group_act" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Participation in small group/support activities</label><br /><br />
				<input 
					type="checkbox" 
					id="indiv_consult" 
					name="service" 
					value="indiv_consult" 
					checked={form.service.includes("indiv_consult")}
					onChange={() => updateServices()}
				/>
				<label htmlFor="indiv_consult" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Individual consultation</label><br /><br />
				<input 
					type="checkbox" 
					id="group_consult" 
					name="service" 
					value="group_consult" 
					checked={form.service.includes("group_consult")}
					onChange={() => updateServices()}
				/>
				<label htmlFor="group_consult" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>Small group consultation</label><br /><br />

				<label>Service goals</label><br /><br /> 
				<div id="goals">
					{goals}
				</div>
				<button
					type="button"
					style={{margin: '0.5rem 0.5rem 2rem'}}
					onClick={() => {
						form["goal" + (numGoals + 1)] = ""
						form["goal_met_y" + (numGoals + 1)] = false
						form["goal_met_date" + (numGoals + 1)] = ""
						updateForm({num_goals: numGoals + 1})
						setNumGoals(numGoals + 1)
					}}>
					Add new goal
				</button><br />

				<label htmlFor="date_term">Date services terminated</label><br />
				<input 
					type="text" 
					id="date_term" 
					name="date_term" 
					value={form.date_term}
					onChange={(e) => updateForm({date_term: e.target.value})}
				/><br />

				<label>Individual/Family not responsive to contact?</label><br />
				<input 
					type="radio" 
					id="responsive_y" 
					name="responsive" 
					value="Yes" 
					checked={form.responsive === "Yes"}
					onChange={(e) => updateForm({responsive: e.target.value})}
				/>
				<label htmlFor="responsive_y" style={{margin:'0 2rem 0 0.3rem', fontSize: '1rem'}}>Yes</label>
				<input 
					type="radio" 
					id="responsive_n" 
					name="responsive" 
					value="No" 
					checked={form.responsive === "No"}
					onChange={(e) => updateForm({responsive: e.target.value})}
				/>
				<label htmlFor="responsive_n" style={{marginLeft: '0.3rem', fontSize: '1rem'}}>No</label><br /><br />

				<input className="accent-button" type="submit" value="Submit" />

			</form>
		</>
	)
	
}

// Each added goal
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
