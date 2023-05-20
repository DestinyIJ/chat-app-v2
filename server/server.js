const http = require("node:http")
require("dotenv").config()

const PORT = process.env.PORT || 8000

process.on("uncaughtException", (error) => {
    console.log(error)
    process.exit(1)
})


const app = require("./app")
const dbConnect = require("./config/db.config")

const server = http.createServer(app)
dbConnect()

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:8000`)
})

process.on("unhandledRejection", (error) => {
    console.log(error)
    server.close(() => {
        process.exit(1)
    })
})