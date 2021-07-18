import {
  deansignin,
  clubsignin,
  financesignin,
  facultysignin,
} from "../actions/auth";

import {CLUB_LOGIN} from '../constents/authActionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "DEAN_LOGIN":
      localStorage.clear();
      localStorage.setItem('dean_profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case "CLUB_LOGIN":
      localStorage.clear();
      localStorage.setItem('club_profile', JSON.stringify({...action?.data}));
      return { ...state, authData: action?.data };
    case "FIN_LOGIN":
      localStorage.clear();
      localStorage.setItem("fin_profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    case "FAC_LOGIN":
      localStorage.clear();
      localStorage.setItem("fac_profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    default:
      return state;
  }
};
export default authReducer;
