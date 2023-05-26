import io from "socket.io-client"
import { BASE_API_URL } from "../config"

let socket;

const connectSocket = (user_id) => {
    socket = io(BASE_API_URL, {
        query: `user_id=${user_id}`
    })
}

export {socket, connectSocket}