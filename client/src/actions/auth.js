import * as api from "../api/index.js";
export const deansignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.deanLogin(formdata);
    dispatch({ type: "DEAN_LOGIN", data });
    console.log("loggedIn");
    router.push("/dean/dashboard");
  } catch (e) {
    console.log(e);
  }
};
export const clubsignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.clubLogin(formdata);
    console.log(data);
    dispatch({ type: "CLUB_LOGIN", data });
    console.log("loggedIn");
    sessionStorage.getItem("user");
    router.push("/club/home");
  } catch (e) {
    console.log(e);
  }
};
export const financesignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.financeLogin(formdata);
    dispatch({ type: "FIN_LOGIN", data: data });
    console.log("loggedIn");
    router.push("/finance/dashboard");
  } catch (e) {
    console.log(e);
  }
};
export const facultysignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.facultyLogin(formdata);
    dispatch({ type: "FAC_LOGIN", data });
    console.log("loggedIn");
    router.push("/faculty/dashboard");
  } catch (e) {
    console.log(e);
  }
};

