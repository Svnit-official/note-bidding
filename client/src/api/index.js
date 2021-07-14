import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000" });

export const deanLogin = (formdata) => API.post("/api/v1/dean/login", formdata);
export const clubLogin = (formdata) => API.post("/api/v1/club/login", formdata);
export const financeLogin = (formdata) =>
  API.post("/api/v1/finance/login", formdata);
export const facultyLogin = (formdata) =>
  API.post("/api/v1/faculty/login", formdata);
export const clubFormSubmit = (formdata) =>
  API.post("/api/v1/club/sentRequests", formdata);
