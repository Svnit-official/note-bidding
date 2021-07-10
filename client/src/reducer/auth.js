import { signin } from "../actions/auth";
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case signin.LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errors: null };
    default:
      return state;
  }
};
export default authReducer;
