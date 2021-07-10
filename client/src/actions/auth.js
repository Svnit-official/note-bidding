import * as api from "../api/index.js";
export const signin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.signin(formdata);
    dispatch({ type: "AUTH", data });
    router.push("/");
  } catch (e) {
    console.log(e);
  }
};
