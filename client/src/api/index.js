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
export const getPendingRequestsDean = (deanID) =>
  API.get(`/dean/${deanID}/pendingRequests`);
export const approvePendingRequestsDean = (deanID , request) =>
  API.post(`/dean/${deanID}/pendingRequests` , request);
export const rejectPendingRequestsDean = (deanID , request) =>
  API.put(`/dean/${deanID}/pendingRequests`,request);
export const getRespondedRequestsDean = (deanID) =>
  API.get(`/dean/${deanID}/RespondedRequests`);

///////////////////////////// CLUB
export const clubLogin = (formdata) => API.post("/club/login", formdata);

export const clubRequest = (clubID) => API.get(`/club/${clubID}/sentRequests`);
export const clubFormSubmit = (formdata, clubID) =>
  API.post(`/club/${clubID}/sentRequests`, formdata);
export const sendRequestFromDraft = (id) => API.post(`/club/${id}/sendDraft`);
export const clubFormDraft = (formdata, clubID) =>
  API.post(`/club/${clubID}/drafts`, formdata);
export const clubDraftRequest = (clubID) => API.get(`/club/${clubID}/drafts`);
export const clubUpdateDraft = (id, formdata) =>
  API.patch(`/club/${id}/drafts`, formdata);
export const clubDeleteDraft = (id) => API.delete(`/club/${id}/drafts`);
export const clubSentBack = (id) => API.get(`/club/${id}/receivedRequests`)

/////////////////////////// FACULTY
export const facultyLogin = (formdata) => API.post("/faculty/login", formdata);

export const getPendingRequests = (facultyID) =>
  API.get(`/faculty/${facultyID}/pendingRequests`);
export const sendBackPendingRequests = (facultyID , requestID) =>
  API.patch(`/faculty/${facultyID}/pendingRequests`,requestID);
export const approvePendingRequests = (facultyID,requestID) =>
  API.post(`/faculty/${facultyID}/pendingRequests`,requestID);
export const rejectPendingRequests = (facultyID , requestID) =>
  API.put(`/faculty/${facultyID}/pendingRequests`, requestID);

export const getRespondedRequests = (facultyID) =>
  API.get(`/faculty/${facultyID}/RespondedRequests`);

export const getFacultyDetails = (id) => API.get(`/faculty/${id}/details`);
export const updateFacultyDetails = (id, formdata) =>
  API.patch(`/faculty/${id}/details`, formdata);

/////////////////////////// FINANCE
export const financeLogin = (formdata) => API.post("/finance/login", formdata);

export const getPendingRequestsFin = (financeID) =>
  API.get(`/finance/${financeID}/pendingRequests`);
export const sendBackPendingRequestsFin = (financeID,request) =>
  API.patch(`/finance/${financeID}/pendingRequests`,request);
export const approvePendingRequestsFin = (financeID , request) =>
  API.post(`/finance/${financeID}/pendingRequests` , request);
export const rejectPendingRequestsFin = (financeID , request) =>
  API.put(`/finance/${financeID}/pendingRequests`,request);

export const getRespondedRequestsFin = (financeID) =>
  API.get(`/finance/${financeID}/RespondedRequests`);

export const getFinanceDetails = (id) => API.get(`/finance/${id}/details`);
export const updateFinanceDetails = (id, formdata) =>
  API.patch(`/finance/${id}/details`, formdata);
