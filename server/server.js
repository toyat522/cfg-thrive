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
    	admin: '123',
    	user: '456',
  	},
});

app.get('/login', auth, (req, res) => {
	if (req.auth.user === 'admin') {
		res.send('admin');
	} else if (req.auth.user === 'user') {
		res.send('user');
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
