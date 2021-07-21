import * as api from "../api/index.js";

export const getPendingRequestsFinance =(financeID)=> async (dispatch) => {
    console.log(financeID)
    const {data} = await api.getPendingRequestsFin(financeID);
     console.log(data);
     dispatch({ type : "GET_PENDING_REQUESTS_FIN" , payload : data.data.requests})
}

export const approvePendingRequestsFinance = (financeID , request) => async (dispatch) => {
    console.log(financeID , request);
    const {data} = await api.approvePendingRequestsFin(financeID , request)
    console.log(data)
}

export const rejectPendingRequestsFinance = (financeID , request) => async (dispatch) => {

    const {data} = await api.rejectPendingRequestsFin(financeID , request)
    console.log(data)
}

export const getRespondedRequestsFinance = (financeID) => async (dispatch) =>{
    const {data} = await api.getRespondedRequestsFin(financeID);
    console.log(data);
    dispatch({ type : "GET_RESPONDED_REQUESTS_FIN" , payload : data.data.requests})
}

export const sendBackPendingRequestsFinance = (financeID , request) => async (dispatch)=>{
    const {data} = await api.sendBackPendingRequestsFin(financeID, request);
    console.log(data);
}