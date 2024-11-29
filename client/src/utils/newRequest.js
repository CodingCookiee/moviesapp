import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://moviesapp-api-theta.vercel.app/api",
  timeout: 30000, // Increased timeout
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true
  }
});

export default newRequest;
