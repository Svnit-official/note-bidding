import * as api from "../api/index.js";
import {CLUB_FORM_SUBMIT , CLUB_REQUESTS} from '../constents/authActionTypes';

export const clubFormSubmit = (formdata, router) => async (dispatch) => {
    console.log(formdata);
    try {
      const { data } = await api.clubFormSubmit(formdata);
      console.log(data);
      dispatch({ type: CLUB_FORM_SUBMIT, data });
      console.log("form submitted");
      router.push("/club/home");
    } catch (e) {
      console.log(e);
    }
  };

  export const getRequest = (clubID) => async (dispatch) => {
    try {
      
      console.log(clubID);
      const {data} = await api.clubRequest(clubID);
      console.log(data);
      dispatch({ type: CLUB_REQUESTS , payload : data});
    } catch (error) {
      console.log(error)
    }
  }