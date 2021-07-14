import { clubFormSubmit } from "../actions/auth";
const formReducer = (state = { submittedForms: [] }, action) => {
  switch (action.type) {
    case clubFormSubmit.CLUB_FORM_SUBMIT:
      return {
        ...state,
        submittedForms: [...state.submittedForms, action.data],
      };
    default:
      return state;
  }
};
export default formReducer;
