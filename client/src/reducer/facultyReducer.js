const facultyReducer = (state = null, action) => {
    switch (action.type) {
        case "GET_PENDING_REQUESTS" : 
            return {...state , requests: action.payload}
        default : 
            return {...state}
        }
}

export default facultyReducer;