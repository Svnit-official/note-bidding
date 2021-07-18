import * as api from "../api/index.js";

export const clubFormSubmit = (formdata, router) => async (dispatch) => {
    console.log(formdata);
    try {
      const { data } = await api.clubFormSubmit(formdata);
      console.log(data);
      dispatch({ type: "CLUB_FORM_SUBMIT", data });
      console.log("form submitted");
      router.push("/club/home");
    } catch (e) {
      console.log(e);
    }
  };