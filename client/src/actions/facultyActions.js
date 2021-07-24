import * as api from "../api/index.js";

export const getPendingRequests = (facultyID) => async (dispatch) => {
  try {
    console.log(facultyID);
    const { data } = await api.getPendingRequests(facultyID);
    console.log(data);

    dispatch({ type: "GET_PENDING_REQUESTS", payload: data.data.requests });
  } catch (error) {}
};
export const changeFacultyPassword = (id, form, router) => async (dispatch) => {
  try {
    console.log("action");
    const { data } = await api.facultyResetPassword(id, form);
    console.log(data);
    router.push("/club/home");
  } catch (error) {
    console.log(error);
  }
};

export const approvePendingRequest =
  (facultyID, requestID, router) => async (dispatch) => {
    console.log(facultyID, requestID);
    const { data } = await api.approvePendingRequests(facultyID, requestID);
    console.log(data);
    router.push("/faculty/home");
  };

export const rejectPendingRequests =
  (facultyID, requestID, router) => async (dispatch) => {
    const { data } = await api.rejectPendingRequests(facultyID, requestID);
    console.log(data);
    router.push("/faculty/home");
  };

export const getRespondedRequests = (facultyID) => async (dispatch) => {
  const { data } = await api.getRespondedRequests(facultyID);
  dispatch({ type: "GET_RESPONDED_REQUESTS", payload: data.data.requests });
};

export const sendBackPendingRequests =
  (facultyID, requestID, router) => async (dispatch) => {
    const { data } = await api.sendBackPendingRequests(facultyID, requestID);
    console.log(data);
    router.push("/faculty/home");
  };
