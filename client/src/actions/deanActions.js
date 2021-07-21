import * as api from "../api/index.js";

export const getPendingRequestsDean =(deanID)=> async (dispatch) => {
    console.log(deanID)
    const {data} = await api.getPendingRequestsDean(deanID);
     console.log(data);
     dispatch({ type : "GET_PENDING_REQUESTS_DEAN" , payload : data.data.requests})
}

export const approvePendingRequestsDean = (deanID,request) => async (dispatch) => {
    const {data} = await api.approvePendingRequestsDean(deanID,request)
    console.log(data);
}

export const rejectPendingRequestsDean = (deanID,request) => async (dispatch) => {
    const {data} = await api.rejectPendingRequestsDean(deanID,request)
    console.log(data)
}

export const  getRespondedRequestsDean =(deanID) => async (dispatch) => {
    const {data} = await api.getRespondedRequestsDean(deanID);
    dispatch({ type : "GET_RESPONDED_REQUESTS_DEAN" , payload : data.data.requests})
    console.log(data)
}