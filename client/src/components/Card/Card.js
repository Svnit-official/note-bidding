/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Modal,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import UpdateDraft from "../Events/UpdateDraft";
import { sendRequest, deleteRequest } from '../../actions/clubActions';
import CommentSection from "./CommentSection";
import SimpleModal from "./Modal";
export default function SimpleCard({ draft }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [openModal , setOpenModal] = useState(false);

  const downloadPdf = () => {
    const linkSource = `${draft.pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "Event.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleClickOpen = () => {
    setOpen(true);
    // return(
    //   <Modal state={true} />
    // )
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen(true);
  };

  const handleModalOpen = () => {
    console.log("i am here")
    setOpenModal(true);
  }

  const handleModalClose = () => {
    setOpenModal(false);
 
  }

  const sendingRequest = () => {
    console.log("sendRequest", draft._id);
    dispatch(sendRequest(draft._id, history));
  };
  const handleDelete = () => {
    dispatch(deleteRequest(draft._id, history));
  };
  const progress = function (status) {
    switch (status) {
      case "sentByClub":
        return 1;
      case "approvedByFaculty":
        return 2;
      case "approvedByFinance":
        return 3;
      case "approvedByDean":
        return 4;
      default:
        return 0;
    }
  };
  console.log(draft.status);
  return (
    <div
      className="border border-dark rounded"
      style={{
        paddingLeft: "2rem",
        paddingTop: "1rem",
        paddingRight: "2rem",
        paddingBottom: "1rem",
        backgroundColor: "#DBE6FD",
        marginBottom: "1rem",
      }}
    >
      <p style={{ marginBottom: "5px", fontWeight: "500", color: "#423F3E" }}>
        {draft.clubName}
      </p>
      <h1 style={{ fontWeight: "700", marginBottom: "0" }}>
        {draft.eventName}
      </h1>
      <div className="d-flex">
        <div style={{ fontWeight: "400" }}>
          <p
            className=""
            style={{
              textDecoration: "none",
              marginTop: "5px",
              marginBottom: "5px",
              color: "black",
            }}
          >
            {draft.eventDate?.split("T")[0]}
          </p>
          <p
            className=""
            style={{
              marginTop: "5px",
              marginBottom: "15px",
              textDecoration: "none",
              color: "black",
            }}
          >
            {draft.eventDescription}
          </p>
        </div>
        <div
          className=""
          style={{
            marginLeft: "auto",
            textAlign: "center",
            fontWeight: "600",
            color: "orange",
          }}
        >
          <div style={{ color: "#423F3E" }}>Status</div>
          Draft
        </div>
      </div>
      <div>
        <CardActions style={{ padding: "0" }}>
          <Button
            style={{ marginLeft: "0" }}
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            onClick={sendingRequest}
          >
            Send Request
          </Button>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            onClick={downloadPdf}
          >
            Download Pdf
          </Button>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
            style={{ marginLeft: "0" }}
          >
            Details
          </Button>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Edit
          </Button>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleDelete}
          >
            Delete
          </Button>
          {/* <CommentSection id={draft._id}/> */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Comments"}</DialogTitle>
            <DialogActions>
              <CommentSection draft={draft} />
            </DialogActions>
          </Dialog>
        </CardActions>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Submit Event Form"}
          </DialogTitle>
          <DialogActions>
            <UpdateDraft id={draft._id} />
          </DialogActions>
        </Dialog>
        <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            <SimpleModal draft={draft}/>
            </Modal>
      </div>
    </div>
  );
}
