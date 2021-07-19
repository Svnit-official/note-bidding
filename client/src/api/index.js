import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000/api/v1" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("club_profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("club_profile")).token
    }`;
  } else if (localStorage.getItem("dean_profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("dean_profile")).token
    }`;
  } else if (localStorage.getItem("fac_profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("fac_profile")).token
    }`;
  } else if (localStorage.getItem("fin_profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("fin_profile")).token
    }`;
  }

  return req;
});

/////////////////////////DEAN

export const deanLogin = (formdata) => API.post("/dean/login", formdata);
export const getDeanDetails = (id) => API.get(`/dean/${id}/details`);
export const updateDeanDetails = (id, formdata) =>
  API.patch(`/dean/${id}/details`, formdata);

///////////////////////////// CLUB
export const clubLogin = (formdata) => API.post("/club/login", formdata);

export const clubRequest = (clubID) => API.get(`/club/${clubID}/sentRequests`);
export const clubFormSubmit = (formdata,clubID) =>  API.post(`/club/${clubID}/sentRequests`, formdata);

export const clubFormDraft = (formdata,clubID) => API.post(`/club/${clubID}/drafts`,formdata );
export const clubDraftRequest = (clubID) => API.get(`/club/${clubID}/drafts`);

/////////////////////////// FACULTY
export const facultyLogin = (formdata) => API.post("/faculty/login", formdata);

export const getPendingRequests = (facultyID) => API.get(`/faculty/${facultyID}/pendingRequests`)
export const sendBackPendingRequests = (facultyID) => API.patch(`/faculty/${facultyID}/pendingRequests`)
export const approvePendingRequests = (facultyID) => API.post(`/faculty/${facultyID}/pendingRequests`)
export const rejectPendingRequests = (facultyID) => API.put(`/faculty/${facultyID}/pendingRequests`)

export const getRespondedRequests = (facultyID) => API.get(`/faculty/${facultyID}/RespondedRequests`)

export const getFacultyDetails = (id) => API.get(`/faculty/${id}/details`);
export const updateFacultyDetails = (id, formdata) =>API.patch(`/faculty/${id}/details`, formdata);


/////////////////////////// FINANCE
 export const financeLogin = (formdata) => API.post("/finance/login", formdata);

export const getPendingRequestsFin = (facultyID) => API.get(`/finance/${facultyID}/pendingRequests`)
export const sendBackPendingRequestsFin = (facultyID) => API.patch(`/finance/${facultyID}/pendingRequests`)
export const approvePendingRequestsFin = (facultyID) => API.post(`/finance/${facultyID}/pendingRequests`)
export const rejectPendingRequestsFin = (facultyID) => API.put(`/finance/${facultyID}/pendingRequests`)

export const getRespondedRequestsFin = (facultyID) => API.get(`/finance/${facultyID}/RespondedRequests`)

export const getFinanceDetails = (id) => API.get(`/finance/${id}/details`);
export const updateFinanceDetails = (id, formdata) =>API.patch(`/finance/${id}/details`, formdata);