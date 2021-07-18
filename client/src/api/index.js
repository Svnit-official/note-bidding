import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000/api/v1" });

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('club_profile')){
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('club_profile')).token}`;
  }
  else if(localStorage.getItem('dean_profile')){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('dean_profile')).token}`;
}

else if(localStorage.getItem('fac_profile')){
  req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('fac_profile')).token}`;
}

else if(localStorage.getItem('fin_profile')){
  req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('fin_profile')).token}`;
}

  return req;
})

export const deanLogin = (formdata) => API.post("/dean/login", formdata);
export const clubLogin = (formdata) => API.post("/club/login", formdata);
export const financeLogin = (formdata) =>
  API.post("/finance/login", formdata);
export const facultyLogin = (formdata) =>
  API.post("/faculty/login", formdata);
export const clubFormSubmit = (formdata) =>
  API.post("/club/sentRequests", formdata);

export const clubRequest = (clubID) => API.get(`/club/sentRequests/${clubID}`,)
