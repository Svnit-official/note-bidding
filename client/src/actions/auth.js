import * as api from "../api/index.js";
export const signin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formdata);
    dispatch({ type: "LOGIN", data });
    console.log("loggedIn");
    router.push("/");
  } catch (e) {
    console.log(e);
  }
};
