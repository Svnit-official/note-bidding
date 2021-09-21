/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Modal
} from "@material-ui/core";
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import { sendRequest } from "../../actions/clubActions";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import CorrectRequestForm from "../Events/CorrectRequestForm";
import CommentSection from "./CommentSection";
import SimpleModal from "./Modal";

export default function SimpleCard({ event, color }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [openModal , setOpenModal] = useState(false);
  console.log(event);
  //download pdf
  const downloadPdf = () => {
    const linkSource = `${event.pdf}`;
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
    console.log(event._id);
    setOpen(true);
  };
  const handleSubmit = (e) => {
    console.log("submitting corrected request");
    e.preventDefault();
    dispatch(sendRequest(event._id, history));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    console.log("i am here")
    setOpenModal(true);
  }

  const handleModalClose = () => {
    setOpenModal(false);
 
  }

  let flag = false;
  if (
    event.status === "sentByFaculty" ||
    event.status === "sentByFinance" ||
    event.status === "sentByDean"
  ) {
    flag = true;
  }
  console.log(flag);

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

  return (
    <div
      className="border border-dark rounded"
      style={{
        paddingLeft: "2rem",
        paddingTop: "1rem",
        paddingRight: "2rem",
        paddingBottom: "1rem",
        backgroundColor: `${color}`,
        marginBottom: "1rem",
      }}
    >
      <span style={{ fontWeight: "500", color: "#423F3E" }}>Event Name</span>
      <h1 style={{ fontWeight: "700", marginBottom: "0" }}>
        {event.eventName}
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
            {event.eventDate?.split("T")[0]}
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
            {event.eventDescription}
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
          <div style={{ color: "#423F3E" }}>status</div>
          Sent By {event.status.split("By")[1]}
        </div>
      </div>
      <CardActions style={{ padding: "0" }}>
        <Button
          style={{ marginLeft: "0" }}
          s
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
          disabled={!flag}
          onClick={handleClickOpen}
        >
          Edit
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="secondary"
          disabled={!flag}
          onClick={handleSubmit}
        >
          Submit
        </Button>

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
            <CorrectRequestForm id={event._id} />
          </DialogActions>
        </Dialog>
      </CardActions>
      <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            <SimpleModal draft={event}/>
            </Modal>
    </div>
  );
}
