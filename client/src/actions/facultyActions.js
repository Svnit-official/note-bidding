import * as api from "../api/index.js";

export const getPendingRequests = (facultyID) => async (dispatch) => {
  try {
    console.log(facultyID);
    const { data } = await api.getPendingRequests(facultyID);
    console.log(data);

    dispatch({ type: "GET_PENDING_REQUESTS", payload: data.data.requests });
  } catch (error) {}
};
export const changeFacultyPassword = (id, form, router) => async (dispatch) => {
  try {
    console.log("action");
    const { data } = await api.facultyResetPassword(id, form);
    console.log(data);
    router.push("/club/home");
  } catch (error) {
    console.log(error);
  }
};
