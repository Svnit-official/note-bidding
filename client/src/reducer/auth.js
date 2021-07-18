const authReducer = (state = { authData: null, deanDetail: null }, action) => {
  switch (action.type) {
    case "DEAN_LOGIN":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case "DEAN_DETAILS":
      return { ...state, deanDetail: action.payload };
    case "UPDATE_DEAN_DETAILS":
      return { ...state, deanDetail: action.payload };
    case "FACULTY_DETAILS":
      return { ...state, facultyDetail: action.payload };
    case "FINANCE_DETAILS":
      return { ...state, financeDetail: action.payload };
    case "CLUB_LOGIN":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case "FIN_LOGIN":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case "FAC_LOGIN":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    default:
      return state;
  }
};
export default authReducer;
