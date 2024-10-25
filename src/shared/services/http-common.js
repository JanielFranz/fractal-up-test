import axios from "axios";

const API_BASE_URL = "https://pixabay.com/api/";
const http = axios.create({
    baseURL: API_BASE_URL
});

http.defaults.headers.common["Content-Type"] = "application/json";

export default http;