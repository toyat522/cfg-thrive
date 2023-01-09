const mongoose = require("mongoose")
const Db = process.env.ATLAS_URI;

mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("error", function(error) {
    console.log(error)
})

mongoose.connection.on("open", function() {
    console.log("Connected to MongoDB database")
})

module.exports = {

    getModel: function () {
        return mongoose.model("userData", User, "userData")
    },

    getDb: function () {
        return mongoose.connection.db
    }

}
