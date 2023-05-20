const express = require("express")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const bodyParser = require("body-parser")
const xss = require('xss')
const cors = require('cors')


const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan("dev"))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requests per windowMs
});
  
app.use("/tawk", limiter);
app.use(mongoSanitize())


module.exports = app