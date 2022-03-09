import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2000/api",
});

export default instance;