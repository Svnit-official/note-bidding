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
export const getDeanDetails = (id) => API.get(`api/v1/dean/${id}/details`);
export const getFacultyDetails = (id) =>
  API.get(`api/v1/faculty/${id}/details`);
export const getFinanceDetails = (id) =>
  API.get(`api/v1/finance/${id}/details`);
export const updateDeanDetails = (id, formdata) =>
  API.post(`api/v1/dean/${id}/details`, formdata);
