const generalReducer = (state = {isLoading : null , isAuthorized : null} ,action) => {
    switch(action.type){
    case "START_LOADING" : 
        return {...state , isLoading : true};
    case "END_LOADING" :
        return {...state , isLoading : false};
    case "AUTHORIZED" : 
        return {...state , isAuthorized : true};
    case "NOT_AUHORIZED" : 
        
        return {...state , isAuthorized : false};
    default : 
        return state;
    }
}

export default generalReducer;