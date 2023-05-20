const http = require("node:http")
require("dotenv").config()

const PORT = process.env.PORT || 8000

const app = require("./app")

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:8000`)
})