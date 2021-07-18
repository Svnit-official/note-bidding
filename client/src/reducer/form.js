import {CLUB_FORM_SUBMIT , CLUB_REQUESTS} from '../constents/authActionTypes'
const formReducer = (state = { submittedForms: [] }, action) => {
  switch (action.type) {
    case CLUB_FORM_SUBMIT:
      return {
        ...state,
        submittedForms: [...state.submittedForms, action.data],
      };
      case CLUB_REQUESTS:
        return {...state , posts : action.payload.data}
    default:
      return state;
  }
};
export default formReducer;
