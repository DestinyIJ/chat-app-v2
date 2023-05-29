const http = require("node:http")
const path = require("node:path")

require("dotenv").config()

const app = require("./app")
const dbConnect = require("./config/db.config")
const configureSocket = require("./config/socket.config")
const { encryptMessage, decryptMessage } = require("./utils/messageEncryption")

const PORT = process.env.PORT || 8000

process.on("uncaughtException", (error) => {
    console.log(error)
    process.exit(1)
})




const server = http.createServer(app)
dbConnect()
configureSocket(server)



server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:8000`)
})

process.on("unhandledRejection", (error) => {
    console.log(error)
    server.close(() => {
        process.exit(1)
    })
})