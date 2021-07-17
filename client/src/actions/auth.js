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
    console.log(data);
    sessionStorage.setItem("user", data.clubID);
    dispatch({ type: "CLUB_LOGIN", data });
    console.log("loggedIn");
    sessionStorage.getItem("user");
    router.push("/club/submit");
  } catch (e) {
    console.log(e);
  }
};
export const financesignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.financeLogin(formdata);
    dispatch({ type: "FIN_LOGIN", data: data });
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
export const clubFormSubmit = (formdata, router) => async (dispatch) => {
  console.log(formdata);
  try {
    const { data } = await api.clubFormSubmit(formdata);
    console.log(data);
    dispatch({ type: "CLUB_FORM_SUBMIT", data });
    console.log("form submitted");
    router.push("/");
  } catch (e) {
    console.log(e);
  }
};
