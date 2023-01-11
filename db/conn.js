const mongoose = require("mongoose")

// Connect to MongoDB Atlas
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Run when there is an error on connection
mongoose.connection.on("error", function(error) {
    console.log(error)
})

// Run when MongoDB connected normally
mongoose.connection.on("open", function() {
    console.log("Connected to MongoDB database")
})

// Export Model
module.exports = {

    getDb: function () {
        return mongoose.connection.db
    },

}
