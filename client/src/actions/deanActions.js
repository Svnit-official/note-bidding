import * as api from "../api/index.js";

export const getPendingRequestsFinance =(deanID)=> async (dispatch) => {
    console.log(deanID)
    const {data} = await api.getPendingRequestsFin(financeID);
     console.log(data);
     dispatch({ type : "GET_PENDING_REQUESTS_FIN" , payload : data.data.requests})
}

