import * as api from "../api/index.js";

export const getPendingRequestsFinance = (financeID) => async (dispatch) => {
  console.log(financeID);
  const { data } = await api.getPendingRequestsFin(financeID);
  console.log(data);
  dispatch({ type: "GET_PENDING_REQUESTS_FIN", payload: data.data.requests });
};

export const approvePendingRequestsFinance =
  (financeID, request, router) => async (dispatch) => {
    console.log(financeID, request);
    const { data } = await api.approvePendingRequestsFin(financeID, request);
    console.log(data);
    router.push("/finance/home");
  };

export const rejectPendingRequestsFinance =
  (financeID, request, router) => async (dispatch) => {
    const { data } = await api.rejectPendingRequestsFin(financeID, request);
    router.push("/finance/home");
    console.log(data);
  };

export const getRespondedRequestsFinance = (financeID) => async (dispatch) => {
  const { data } = await api.getRespondedRequestsFin(financeID);
  console.log(data);
  dispatch({ type: "GET_RESPONDED_REQUESTS_FIN", payload: data.data.requests });
};

export const sendBackPendingRequestsFinance =
  (financeID, request, router) => async (dispatch) => {
    const { data } = await api.sendBackPendingRequestsFin(financeID, request);
    router.push("/finance/home");
    console.log(data);
  };
