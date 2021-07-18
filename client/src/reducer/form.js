import { CLUB_FORM_SUBMIT } from "../constents/authActionTypes";
const formReducer = (state = { submittedForms: [] }, action) => {
  switch (action.type) {
    case "CLUB_FORM_SUBMIT":
      return {
        ...state,
        submittedForms: [...state.submittedForms, action.data],
      };
    default:
      return state;
  }
};
export default formReducer;
