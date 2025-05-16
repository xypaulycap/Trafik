// socket.js
import { io } from "socket.io-client";

const backendUrl = "https://trafik-backend.onrender.com"; // Change to your backend URL in production
const socket = io(backendUrl);

export default socket;
