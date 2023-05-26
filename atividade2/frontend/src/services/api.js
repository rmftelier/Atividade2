//Consumindo a API 
import axios from "axios";

const defaultHeaders = {
   [Headers.ACCEPT]: 'application/json',
   [Headers.CONTENT_TYPE]: 'application/json'
 };


const api = axios.create({
   baseURL: "http://localhost:5074",
   headers: defaultHeaders
})

export default api;