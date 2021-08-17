import * as api from "../api/index.js";
import {
  CLUB_FORM_SUBMIT,
  CLUB_REQUESTS,
  CLUB_DRAFT_SUBMIT,
  CLUB_DRAFT_REQUEST,
  CLUB_UPDATE_DRAFT,
} from "../constents/authActionTypes";

export const clubFormSubmit =
  (formdata, clubID, router) => async (dispatch) => {
    console.log(formdata);
    try {
      const { data } = await api.clubFormSubmit(formdata, clubID);
      console.log(data);
      console.log("form submitted");
      router.push("/club/sent");
      dispatch({ type: CLUB_FORM_SUBMIT, data });
    } catch (e) {
      console.log(e);
    }
  };

export const clubFormDraft = (formdata, clubID, router) => async (dispatch) => {
  try {
    const { data } = await api.clubFormDraft(formdata, clubID);
    console.log(data);
    console.log("draft submitted");
    router.push("/club/drafts");
    dispatch({ type: CLUB_DRAFT_SUBMIT, data });
  } catch (e) {
    console.log(e);
  }
};

export const getRequest = (clubID) => async (dispatch) => {
  try {
    console.log(clubID);
    const { data } = await api.clubRequest(clubID);
    console.log(data.data.requests);
    dispatch({ type: CLUB_REQUESTS, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const getDraftRequest = (clubID) => async (dispatch) => {
  try {
    console.log(clubID);
    const { data } = await api.clubDraftRequest(clubID);
    console.log(data);
    dispatch({ type: CLUB_DRAFT_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateDraft = (id, formdata, router) => async (dispatch) => {
  try {
    const { data } = await api.clubUpdateDraft(id, formdata);
    console.log(data);
    router.push("/club/drafts");
  } catch (error) {
    console.log(error);
  }
};
export const sendRequest = (id, router) => async (dispatch) => {
  try {
    console.log("action");
    const { data } = await api.sendRequestFromDraft(id);
    console.log(data);
    router.push("/club/sent");
  } catch (error) {
    console.log(error);
  }
};
export const deleteRequest = (id, router) => async (dispatch) => {
  try {
    console.log("action");
    const { data } = await api.clubDeleteDraft(id);
    console.log(data);
    router.push("/club/drafts");
  } catch (error) {
    console.log(error);
  }
};
export const changeClubPassword = (id, form, router) => async (dispatch) => {
  try {
    console.log("action");
    const { data } = await api.clubResetPassword(id, form);
    console.log(data);
    router.push("/club/home");
  } catch (error) {
    console.log(error);
  }
};

export const handleReceiptDownload = (id, formdata) => async (dispatch) => {
  // console.log(id, formdata);
  const { data } = await api.clubDownloadReceipt(id, formdata);
  //console.log(data)
  // console.log(data.pdfBinary);
  const link = "data:application/pdf;base64," + data.pdfBinary;
  dispatch({ type: "DOWNLOAD_PDF", payload: data.pdfBinary });
  // console.log(link);

  const linkSource = link;
  const downloadLink = document.createElement("a");
  const fileName = "Event.pdf";

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};


export const postClubComments = (clubID,request) => async (dispatch) => {

  const data = await api.postClubComments(clubID,request);
  console.log(data);
  return data;
}

export const publishEvent = (clubID , request) => async (dispatch) => {
  const data = await api.publishEvent(clubID,request);
  console.log(data);
}