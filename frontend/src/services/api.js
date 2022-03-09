import axios from "axios";

const instance = axios.create({
  baseURL: "http://backend:2000/api",
});

export default instance;