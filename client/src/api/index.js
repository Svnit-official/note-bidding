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
export const deanResetPassword = (id, formdata) =>
  API.patch(`/dean/${id}/changePassword`, formdata);
export const getPendingRequestsDean = (deanID) =>
  API.get(`/dean/${deanID}/pendingRequests`);
export const approvePendingRequestsDean = (deanID , request) =>
  API.post(`/dean/${deanID}/pendingRequests` , request);
export const rejectPendingRequestsDean = (deanID , request) =>
  API.put(`/dean/${deanID}/pendingRequests`,request);
export const getRespondedRequestsDean = (deanID) =>
  API.get(`/dean/${deanID}/respondedRequests`);
export const sendBackPendingRequestsDean = (deanID, formdata) =>
 API.patch(`/dean/${deanID}/pendingRequests`, formdata) // 'Send back' button on request (after adding comments)

export const deanDownloadReceipt = (id, formdata) => API.get(`/club/${id}/downloadPdf/dean`);
export const postDeanComments = (deanId, formdata) =>
  API.post(`/club/${deanId}/comments`, formdata);


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
export const clubResetPassword = (id, formdata) =>
  API.patch(`/club/${id}/changePassword`, formdata);
export const clubSentBack = (id) => API.get(`/club/${id}/receivedRequests`)
export const clubDownloadReceipt = (clubId, formdata) => API.post(`/club/${clubId}/downloadPdf/club/`,formdata);
export const postClubComments = (clubId, formdata) => API.post(`/club/${clubId}/comments`, formdata);

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
export const facultyResetPassword = (id, formdata) =>
  API.patch(`/faculty/${id}/changePassword`, formdata);

export const facultyDownloadReceipt = (id, formdata) => API.get(`/club/${id}/downloadPdf/faculty`);
export const postFacultyComments = (facultyId, formdata) =>
  API.post(`/club/${facultyId}/comments`, formdata);


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
export const financeResetPassword = (id, formdata) =>
  API.patch(`/finance/${id}/changePassword`, formdata);

export const financeDownloadReceipt = (id, formdata) => API.get(`/club/${id}/downloadPdf/finance`);
export const postFinanceComments = (financeId, formdata) =>
  API.post(`/club/${financeId}/comments`, formdata);
