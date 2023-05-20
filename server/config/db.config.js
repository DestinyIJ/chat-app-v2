const mongoose= require("mongoose")
const { ServerApiVersion } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || ""

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1,
    autoIndex: false, 
    dbName: process.env.MONGODB_NAME
}

const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, options)
        console.log("Database Connection successful")
    } catch (error) {
        console.log("Database Connection failed")
    }
}

module.exports = dbConnect