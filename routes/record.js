const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const dbo = require("../db/conn")

// Help convert id from string to ObjectId for _id
const ObjectId = require("mongodb").ObjectId

// This section will help you get a list of all the records.
router.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb()
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err
        res.json(result)
        })
})

// This section will help you get a single record by id
router.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect
        .collection("records")
        .findOne(myquery, function (err, result) {
    if (err) throw err
        res.json(result)
    })
})

// This section will help you create a new record.
router.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb()
    db_connect.collection("records").insertOne(req.body, function (err, res) {
        if (err) throw err
        response.json(res)
    })
})

// This section will help you update a record by id.
router.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    const updated = req.body
    delete updated._id
    db_connect
        .collection("records")
        .updateOne(myquery, {$set: updated}, function (err, res) {
            if (err) throw err
            response.json(res)
        })
})

// This section will help you delete a record
router.route("/:id").delete((req, res) => {
    let db_connect = dbo.getDb()
    var myquery = { id: req.body._id }
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err
        console.log("1 document deleted")
    })
})

// Login route to verify a user and get a token
router.post("/login", async (req, res) => {

    try {

        let db_connect = dbo.getDb()
        const user = await db_connect
            .collection("userData")
            .findOne({ username: req.body.username })

        if (user) {

            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {

                // Sends the user role back to client (checks if user has enough power to access a webpage)
                if (req.body.username === 'authorized') {
                    res.send('authorized');
                } else if (req.body.username === 'standard') {
                    res.send('standard');
                } else if (req.body.username === 'view') {
                    res.send('view')
                }

            } else {
                res.status(400).json({error: "password doesn't match"})
            }

        } else {
            res.status(400).json({ error: "User doesn't exist" })
        }

    } catch (error) {
        res.status(400).json({ error })
    }

})

// This section will help you update a record by id.
router.route("/updatepassword/:id").post(function (req, response) {
    let db_connect = dbo.getDb()
    console.log(req.params.id)
    let myquery = { username: req.params.id }
    const updated = req.body
    db_connect
        .collection("userData")
        .updateOne(myquery, {$set: updated}, function (err, res) {
            if (err) throw err
            response.json(res)
        })
})

module.exports = router
