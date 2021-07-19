import * as api from "../api/index.js";

export const getPendingRequests = (facultyID) => async (dispatch) => {
    try {
        console.log(facultyID)
        const {data} = await api.getPendingRequests(facultyID);
        console.log(data);
        dispatch({type : "GET_PENDING_REQUESTS" , payload : data});

    } catch (error) {
        
    }
}