import {
  deansignin,
  clubsignin,
  financesignin,
  facultysignin,
} from "../actions/auth";
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case deansignin.DEAN_LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case clubsignin.CLUB_LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case financesignin.FIN_LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case facultysignin.FAC_LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    default:
      return state;
  }
};
export default authReducer;
