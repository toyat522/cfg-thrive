const express = require("express");
const cors = require("cors");
const path = require("path")
const basicAuth = require('express-basic-auth')

const app = express();

//require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//app.use(require("./routes/record"));

/*
app.use(basicAuth({
	challenge: true,
	users: { 'admin': 'supersecret' }
}))
*/

const auth = basicAuth({
  	users: {
    	authorized: '123',
    	standard: '456',
		view: '789'
  	}
})

app.get('/login', auth, (req, res) => {
	if (req.auth.user === 'authorized') {
		res.send('authorized');
	} else if (req.auth.user === 'standard') {
		res.send('standard');
	} else if (req.auth.user === 'view') {
		res.send('view')
	}
});

// get driver connection
//const dbo = require("./db/conn");

/*
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});
*/

app
  .use(express.static(path.join(__dirname, '../client/build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
