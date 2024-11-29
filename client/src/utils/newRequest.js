import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://moviesapp-api-theta.vercel.app/api",
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default newRequest;
