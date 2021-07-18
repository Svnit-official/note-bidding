const authReducer = (state = { authData: null, deanDetail: null }, action) => {
  switch (action.type) {
    case "DEAN_LOGIN":
      localStorage.clear();
      localStorage.setItem("dean_profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case "DEAN_DETAILS":
      return { ...state, deanDetail: action.payload };
    case "UPDATE_DEAN_DETAILS":
      return { ...state, deanDetail: action.payload };
    case "FACULTY_DETAILS":
      return { ...state, facultyDetail: action.payload };
    case "UPDATE_FACULTY_DETAILS":
      return { ...state, facultyDetail: action.payload };
    case "FINANCE_DETAILS":
      return { ...state, financeDetail: action.payload };
    case "UPDATE_FINANCE_DETAILS":
      return { ...state, financeDetail: action.payload };
    case "CLUB_LOGIN":
      localStorage.clear();
      localStorage.setItem("club_profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case "FIN_LOGIN":
      localStorage.clear();
      localStorage.setItem("fin_profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case "FAC_LOGIN":
      localStorage.clear();
      localStorage.setItem("fac_profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case "LOGOUT":
      localStorage.clear();
      sessionStorage.clear();
    default:
      return state;
  }
};
export default authReducer;
