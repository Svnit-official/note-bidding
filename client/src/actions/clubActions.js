import * as api from "../api/index.js";
import {CLUB_FORM_SUBMIT , CLUB_REQUESTS , CLUB_DRAFT_SUBMIT , CLUB_DRAFT_REQUEST} from '../constents/authActionTypes';

export const clubFormSubmit = (formdata,clubID,router) => async (dispatch) => {
    console.log(formdata);
    try {
      const { data } = await api.clubFormSubmit(formdata,clubID);
      console.log(data);
      dispatch({ type: CLUB_FORM_SUBMIT, data });
      console.log("form submitted");
      router.push("/club/home");
    } catch (e) {
      console.log(e);
    }
  };

  export const clubFormDraft = (formdata,clubID,router) => async (dispatch) => {
    try {
      const { data } = await api.clubFormDraft(formdata,clubID);
      console.log(data);
      dispatch({ type: CLUB_DRAFT_SUBMIT, data });
      console.log("draft submitted");
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

  export const getDraftRequest = (clubID) => async (dispatch) => {
    try {
      
      console.log(clubID);
      const {data} = await api.clubDraftRequest(clubID);
      console.log(data);
      dispatch({ type: CLUB_DRAFT_REQUEST , payload : data});
    } catch (error) {
      console.log(error)
    }
  }