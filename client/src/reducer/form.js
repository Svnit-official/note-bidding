import {
  CLUB_FORM_SUBMIT,
  CLUB_REQUESTS,
  CLUB_DRAFT_SUBMIT,
  CLUB_DRAFT_REQUEST,
} from "../constents/authActionTypes";
const formReducer = (
  state = { submittedForms: {}, draftForms: {} ,publishedEvents:[] },
  action
) => {
  switch (action.type) {
    case CLUB_FORM_SUBMIT:
      return {
        ...state,
        submittedForms: [...state.submittedForms, action.data],
      };
    case CLUB_REQUESTS:
      return { ...state, submittedForms: action.payload };
    case CLUB_DRAFT_SUBMIT:
      return {
        ...state,
        draftForms: [...state.draftForms, action.data],
      };
    case CLUB_DRAFT_REQUEST:
      return {
        ...state,
        drafts: action.payload.data,
      };
    case "GET_PUBLISHED_EVENTS" :
      return {...state ,publishedEvents : action.payload}
    default:
      return state;
  }
};
export default formReducer;
