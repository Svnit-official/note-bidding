import * as api from "../api/index.js";

export const getPendingRequestsDean = (deanID) => async (dispatch) => {
  console.log(deanID);
  const { data } = await api.getPendingRequestsDean(deanID);
  console.log(data);
  dispatch({ type: "GET_PENDING_REQUESTS_DEAN", payload: data.data.requests });
};

export const approvePendingRequestsDean =
  (deanID, request, router) => async (dispatch) => {
    const { data } = await api.approvePendingRequestsDean(deanID, request);
    router.push("/dean/home");
    console.log(data);
  };

export const rejectPendingRequestsDean =
  (deanID, request, router) => async (dispatch) => {
    const { data } = await api.rejectPendingRequestsDean(deanID, request);
    router.push("/dean/home");
    console.log(data);
  };

export const getRespondedRequestsDean = (deanID) => async (dispatch) => {
  const { data } = await api.getRespondedRequestsDean(deanID);
  dispatch({
    type: "GET_RESPONDED_REQUESTS_DEAN",
    payload: data.data.requests,
  });
  console.log(data);
};

export const sendBackPendingRequestsDean =
  (deanID, request, router) => async (dispatch) => {
    const { data } = await api.sendBackPendingRequestsDean(deanID, request);
    console.log(data);
    router.push("/dean/home");
  };

export const postDeanComments = (deanID,request) => async (dispatch) => {
  const {data} = await api.postDeanComments(deanID, request);
  return (data.data.c);
}