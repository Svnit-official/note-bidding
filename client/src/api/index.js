import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000" });

export const login = (formdata) => API.post("/api/v1/dean/login", formdata);
