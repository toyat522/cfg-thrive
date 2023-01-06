const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")
require("dotenv").config({ path: "./config.env" });

// Port to deploy website
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const dbo = require("./db/conn");

// Basic authentication
const basicAuth = require('express-basic-auth')
const auth = basicAuth({
  	users: {
    	authorized: '123',
    	standard: '456',
		view: '789'
  	}
})

// Called when user tries to log in
app.get('/login', auth, (req, res) => {

    // Sends the user role back to client (checks if user has enough power to access a webpage)
	if (req.auth.user === 'authorized') {
		res.send('authorized');
	} else if (req.auth.user === 'standard') {
		res.send('standard');
	} else if (req.auth.user === 'view') {
		res.send('view')
	}

});

app
  	.use(express.static(path.join(__dirname, './client/build')))
  	.listen(port, () => {

  		// Perform a database connection when server starts
  		dbo.connectToServer(function (err) {
    		if (err) console.error(err);
  		});
  		console.log(`Server is running on port: ${port}`);

	})

app.get('*', (req, res) => {
  	res.sendFile(path.join(__dirname, './client/build/index.html'));
})
