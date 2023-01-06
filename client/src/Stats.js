import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Chart from 'chart.js/auto'
import { Line, Bar, Pie } from 'react-chartjs-2'

const LineChart = () => {
	const labels = ["January", "February", "March", "April", "May", "June"];
	const data = {
		labels: labels,
		datasets: [
			{
				label: "My First dataset",
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgb(255, 99, 132)",
				data: [0, 10, 5, 2, 20, 30, 45],
			},
		],
	};
	return (
		<div style={{height: '500px', justifyContent: 'center', display: 'flex'}}>
			<Line data={data} />
		</div>
	);
};

const BarChart = () => {
	const labels = ["January", "February", "March", "April", "May", "June"];
	const data = {
		labels: labels,
		datasets: [
		{
			label: "My First dataset",
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgb(255, 99, 132)",
			data: [0, 10, 5, 2, 20, 30, 45],
		},
		],
	};
	return (
		<div style={{height: '500px', justifyContent: 'center', display: 'flex'}}>
			<Bar data={data} />
		</div>
	);
};

const PieChart = () => {
	const labels = ["January", "February", "March", "April", "May", "June"];
	const data = {
	labels: labels,
	datasets: [
		{
		label: "My First dataset",
		backgroundColor: "rgb(255, 99, 132)",
		borderColor: "rgb(0,0,255)",
		data: [0, 10, 5, 2, 20, 30, 45],
		},
	],
	};
	return (
		<div style={{height: '400px', justifyContent: 'center', display: 'flex'}}>
		  	<Pie data={data} />
		</div>
	);
};

const Stats = () => {

	const navigate = useNavigate()

	// Need to be authenticated to access webpage
	const auth = async () => {
		try {
			const res = await axios.get('/login', { auth: JSON.parse(sessionStorage.getItem('token')) })
		} catch (e) {
			navigate('/login')
		}
	}
	auth()

	return (
		<>
			<button
				className="muted-button"
				onClick={()=>navigate('/')}
				style={{margin: '1rem 1rem 1rem'}}>
				Back to home
			</button>
          	<LineChart />
          	<br />
          	<BarChart />
          	<br />
          	<PieChart />
          	<br />
		</>
	)
}

export default Stats;
