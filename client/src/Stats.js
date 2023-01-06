import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Chart from 'chart.js/auto'
import { Bar, Pie } from 'react-chartjs-2'

const env = process.env.NODE_ENV

const Stats = () => {

    // For navigating between webpages
    const navigate = useNavigate()
    const [showComponent, setShowComponent] = useState(false); // State for showing all charts (true after some time)
    const [genderDist, setGenderDist] = useState([]) // State for gender distibution ([0] - male, [1] - female, [2] - other)
    const [raceDist, setRaceDist] = useState([]) // State for race distibution (white, black, native, asian, native hawaiian, other)
    const [serviceDist, setServiceDist] = useState([]) // State for service distibution (navigation, intensive navigation, flexible funding, small group activities, individual consultation, small group consultation, other)
    const [genderRaceDist, setGenderRaceDist] = useState([[]]) // State for gender and race distibution ([race][gender] in the order above)

    // Set showComponent to true after 1.5 seconds
    useEffect(() => {
        if (!showComponent) {
            const toRef = setTimeout(() => {
                setShowComponent(true);
                clearTimeout(toRef);
            }, 1500);
        }
    }, [showComponent]);

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

        // Variables to store data distribution
        let numGender = [0, 0, 0]
        const genderVals = ['M', 'F', 'O']
        let numRace = new Array(6).fill(0)
        const raceVals = ["White", "Black", "AIAN", "Asian", "Pacific Islander", "Other"]
        let numService = new Array(6).fill(0)
        const serviceVals = ["nav", "intense_nav", "flex_fund", "group_act", "indiv_consult", "group_consult"]
        let numGenderRace = []
        for (let i = 0; i < 3; i++) {
            numGenderRace.push(new Array(6).fill(0))
        }

        // Iterate through MongoDB records and update shown data
        for (let i = 0; i < records.length; i++) {

            // Get the i-th record (client information)
            const curr = records[i]

            // Add corresponding gender value
            numGender[genderVals.indexOf(curr.gender)]++

            // Check for race distirbution
            curr.race.forEach((race, index) => {
                numRace[raceVals.indexOf(race)]++
                numGenderRace[genderVals.indexOf(curr.gender)][raceVals.indexOf(race)]++
            })

            // Check for service distribution
            curr.service.forEach((service, index) => {
                numService[serviceVals.indexOf(service)]++
            })

        }

        // Set distributions to the corresponding states
        setGenderDist(numGender)
        setRaceDist(numRace)
        setServiceDist(numService)
        setGenderRaceDist(numGenderRace)

        return;
    }, [records.length]);

    // Gender
    const GenderChart = () => {
        const labels = ["Male", "Female", "Other"];
        const data = {
        labels: labels,
        datasets: [
            {
            label: "Gender Distribution",
            backgroundColor: [
                "#00f",
                "#f00",
                "#0f0"
            ],
            data: genderDist,
            },
        ],
        };
        return (
            <>
                <center>
                    <h3>Gender Distribution</h3>
                </center>
                <div style={{height: '400px', justifyContent: 'center', display: 'flex'}}>
                    <Pie data={data} />
                </div>
            </>
        );
    };

    // Services received
    const ServiceChart = () => {
        const labels = ["Navigation", "Intensive service navigation", "Flexible funding", "Small group/support activities", "Individual consultation", "Small group consultation"];
        const data = {
        labels: labels,
        datasets: [
            {
            label: "Distribution of Services Received",
            backgroundColor: [
                "#007d9c",
                "#244d70",
                "#d123b3",
                "#f7e018",
                "#0f0",
                "#fe452a",
            ],
            data: serviceDist,
            },
        ],
        };
        return (
            <>
                <center>
                    <h3>Distribution of Services Received</h3>
                </center>
                <div style={{height: '400px', justifyContent: 'center', display: 'flex'}}>
                    <Pie data={data} />
                </div>
            </>
        );
    };

    // Ethnic diversity
    const RaceChart = () => {
        const labels = ["White", "African American", "American Indian", "Asian", "Pacific Islander", "Other"];
        const data = {
        labels: labels,
        datasets: [
            {
            label: "Ethnicity Distribution",
            backgroundColor: [
                "#04e484",
                "#8164fc",
                "#02824b",
                "#78787a",
                "#aca8c8",
                "#fb7b8b",
            ],
            data: raceDist,
            },
        ],
        };
        return (
            <>
                <center>
                    <h3>Ethnicity Distribution</h3>
                </center>
                <div style={{height: '400px', justifyContent: 'center', display: 'flex'}}>
                    <Pie data={data} />
                </div>
            </>
        );
    };

    // Gender and race
    const GenderAndRaceChart = () => {
        const labels = ["White", "African American", "American Indian", "Asian", "Pacific Islander", "Other"];
        const data = {
            labels: labels,
            datasets: [
            {
                label: "Male",
                backgroundColor: "blue",
                data: genderRaceDist[0],
            },
            {
                label: "Female",
                backgroundColor: "red",
                data: genderRaceDist[1],
            },
            {
                label: "Other",
                backgroundColor: "green",
                data: genderRaceDist[2],

            },
            ],
        };
        return (
            <>
                <center>
                    <h3>Gender and Race Distribution</h3>
                </center>
                <div style={{height: '500px', justifyContent: 'center', display: 'flex'}}>
                    <Bar data={data} />
                </div>
            </>
        );
    };
    // Need to be authenticated to access webpage
    const auth = async () => {
        try {
            const res = await axios.get('/login', { auth: JSON.parse(sessionStorage.getItem('token')) })
        } catch (e) {
            navigate('/login')
        }
    }
    auth()

    // Only show component after a coupld of seconds
    if (showComponent) {

        return (
            <>
                <button
                    className="muted-button"
                    onClick={()=>navigate('/')}
                    style={{margin: '1rem 1rem 1rem'}}>
                    Back to home
                </button>
                <br />
                <GenderChart />
                <br />
                <RaceChart />
                <br />
                <ServiceChart />
                <br />
                <GenderAndRaceChart />
                <br />
            </>
        )

    } else {

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

}

export default Stats;
