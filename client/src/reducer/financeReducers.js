const financeReducer = (state = null, action) => {
    switch (action.type) {
        case "GET_PENDING_REQUESTS_FIN" : 
            return {...state , requests: action.payload}
        default : 
            return {...state}
        }
}

export default financeReducer;