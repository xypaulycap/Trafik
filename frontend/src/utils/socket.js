// socket.js
import { io } from "socket.io-client";

const backendUrl = "http://localhost:4000"; // Change to your backend URL in production
const socket = io(backendUrl);

export default socket;
