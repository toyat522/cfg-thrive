const express = require("express");
const bodyParser = require("body-parser")
const session = require("express-session")
const cors = require("cors");
const path = require("path")
require("dotenv").config({ path: "../../config.env" });

// Port to deploy website
const port = process.env.PORT || 8080;

// Create express app
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(bodyParser.urlencoded({ extended: false }))

// Get driver connection
const dbo = require("./db/conn");

app
    .use(express.static(path.join(__dirname, './client/build')))
    .listen(port, () => { console.log(`Server is running on port: ${port}`) })

app.get('*', (req, res) => {
    //res.send(req.sessionID)
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})
