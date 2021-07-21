import * as api from "../api/index.js";

export const getPendingRequests = (facultyID) => async (dispatch) => {
    try {
        console.log(facultyID)
        const {data} = await api.getPendingRequests(facultyID);
         console.log(data);
        
        dispatch({type : "GET_PENDING_REQUESTS" , payload : data.data.requests});

    } catch (error) {
        
    }
}

export const approvePendingRequest = (facultyID , requestID) => async (dispatch) => {
    console.log(facultyID , requestID)
    const {data} = await api.approvePendingRequests(facultyID,requestID);
    console.log(data);
}

export const rejectPendingRequests = (facultyID , requestID) => async (dispatch) => {
    const {data} = await api.rejectPendingRequests(facultyID , requestID);
    console.log(data);
}

export const getRespondedRequests = (facultyID) => async (dispatch) => {
    const {data} = await api.getRespondedRequests(facultyID);
    dispatch({type : "GET_RESPONDED_REQUESTS" , payload : data.data.requests});
    
}

export const sendBackPendingRequests = (facultyID,requestID) => async (dispatch) => {
    const {data} = await api.sendBackPendingRequests(facultyID,requestID);
    console.log(data);
}