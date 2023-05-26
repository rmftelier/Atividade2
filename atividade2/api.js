//Consumindo a API 
import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:5074"
})

export default api;