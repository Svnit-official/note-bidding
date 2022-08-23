import * as api from "../api/index.js";
export const deansignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.deanLogin(formdata);
    sessionStorage.setItem("dean", data.deanID);
    console.log(sessionStorage.getItem("dean"));
    dispatch({ type: "DEAN_LOGIN", data });
    console.log("loggedIn");
    router.push(`/dean/home`);
    return "success"
  } catch (e) {
    alert("Invalid Username or Password")
    console.log(e);
    return "failed"
  }
};
export const deanDetails = (id) => async (dispatch) => {
  console.log("hi");
  const { data } = await api.getDeanDetails(id);
  console.log(data);
  dispatch({ type: "DEAN_DETAILS", payload: data.data.deanDetails });
  console.log(data.data.deanDetails);
};
export const updateDeanDetails = (id, formdata, router) => async (dispatch) => {
  const { data } = await api.updateDeanDetails(id, formdata);
  dispatch({ type: "UPDATE_DEAN_DETAILS", payload: data.data.deanDetailsNew });
};
export const clubsignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.clubLogin(formdata);
    console.log(data);
    if (data.status === "success") {
      dispatch({ type: "CLUB_LOGIN", data });
      dispatch({ type: "AUTHORIZED" });
      console.log("loggedIn");
      router.push("/club/home");
      return data;
    } else {
      alert("Invalid Username or Password")
      console.log("not Authorized");
      dispatch({ type: "NOT_AUHORIZED" });
      router.push("/club/login");
      const datax = {
        status : "unauthorized 8"
      }
      return datax;
    }
  } catch (e) {
    alert("Invalid Username or Password")
    console.log("not authorized");
    dispatch({ type: "NOT_AUHORIZED" });
    const datax = {
      status : "unauthorized 2"
    }
    return {...datax};
  }
};

export const financesignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.financeLogin(formdata);
    console.log(data);
    sessionStorage.setItem("finance", data.financeID);
    console.log(sessionStorage.getItem("faculty"));
    dispatch({ type: "FIN_LOGIN", data: data });
    console.log("loggedIn");
    router.push(`/finance/home`);
    return "success";
  } catch (e) {
    alert("Invalid Username or Password")
    console.log(e);
    return "failed";
  }
};
export const financeDetails = (id) => async (dispatch) => {
  console.log("hi");
  const { data } = await api.getFinanceDetails(id);
  console.log(data);
  dispatch({ type: "FINANCE_DETAILS", payload: data.data.financeDetails });
  console.log(data.data.financeDetails);
};
export const updateFinanceDetails =
  (id, formdata, router) => async (dispatch) => {
    const { data } = await api.updateFinanceDetails(id, formdata);
    dispatch({
      type: "UPDATE_FINANCE_DETAILS",
      payload: data.data.financeDetailsNew,
    });
    console.log(data.data.financeDetailsNew);
  };
export const facultysignin = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.facultyLogin(formdata);
    console.log(data);
    sessionStorage.setItem("faculty", data.facultyID);
    console.log(sessionStorage.getItem("faculty"));
    dispatch({ type: "FAC_LOGIN", data });
    console.log("loggedIn");
    router.push("/faculty/home");
    return "success"
  } catch (e) {
    alert("Invalid Username or Password")
    console.log(e);
    return "failed";
  }
};
export const facultyDetails = (id) => async (dispatch) => {
  console.log("hi");
  const { data } = await api.getFacultyDetails(id);
  dispatch({ type: "FACULTY_DETAILS", payload: data.data.facultyDetails });
  console.log(data.data.facultyDetails);
};
export const updateFacultyDetails =
  (id, formdata, router) => async (dispatch) => {
    const { data } = await api.updateFacultyDetails(id, formdata);
    dispatch({
      type: "UPDATE_FACULTY_DETAILS",
      payload: data.data.facultyDetailsNew,
    });
    // router.push(`/faculty/${id}/details`);
  };

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
export const changeDeanPassword = (id, form, router) => async (dispatch) => {
  try {
    console.log("action");
    const { data } = await api.deanResetPassword(id, form);
    console.log(data);
    router.push("/dean/login");
  } catch (error) {
    console.log(error);
  }
};
export const changeFinancePassword = (id, form, router) => async (dispatch) => {
  try {
    console.log("action");
    const { data } = await api.financeResetPassword(id, form);
    console.log(data);
    router.push("/finance/login");
  } catch (error) {
    console.log(error);
  }
};
