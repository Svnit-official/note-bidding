import * as api from "../api/index.js";
export const deansignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.deanLogin(formdata);
    dispatch({ type: "DEAN_LOGIN", data });
    console.log("loggedIn");
    router.push("/");
  } catch (e) {
    console.log(e);
  }
};
export const clubsignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.clubLogin(formdata);
    dispatch({ type: "CLUB_LOGIN", data });
    console.log("loggedIn");
    router.push("/");
  } catch (e) {
    console.log(e);
  }
};
export const financesignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.financeLogin(formdata);
    dispatch({ type: "FIN_LOGIN", data });
    console.log("loggedIn");
    router.push("/");
  } catch (e) {
    console.log(e);
  }
};
export const facultysignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.facultyLogin(formdata);
    dispatch({ type: "FAC_LOGIN", data });
    console.log("loggedIn");
    router.push("/");
  } catch (e) {
    console.log(e);
  }
};
