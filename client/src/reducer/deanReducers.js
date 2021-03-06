const deanReducer = (state = null, action) => {
    switch (action.type) {
        case "GET_PENDING_REQUESTS_DEAN" : 
            return {...state , requests: action.payload };
        case "GET_RESPONDED_REQUESTS_DEAN":
            return {...state , requests: action.payload }
        default : 
            return {...state}
        }
}

export default deanReducer;