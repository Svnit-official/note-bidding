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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { handleReceiptDownload } from "../../actions/clubActions";
import { useDispatch, useSelector } from "react-redux";
import PublishForm from "../PublishForm/PublishForm";
import CommentSection from "./CommentSection";
import SimpleModal from "./Modal";
import { Link } from "react-router-dom";

export default function SimpleCard({ event, status, color, text }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  console.log(event);
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

  const handleDownloadReceipt = () => {
    console.log(user.clubID, event._id);
    const x = user.clubID;
    const y = {
      id: event._id,
    };
    dispatch(handleReceiptDownload(x, y));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let flag2 = false;
  if (event.status.includes("rejected")) {
    flag2 = true;
  }
  let textcolor = "green";
  if (flag2) {
    textcolor = "red";
  }
  let bgColor = "#ADEECF";
  if (flag2) {
    bgColor = "#FDD2BF";
  }
  let flag = false;
  if (event.status === "sentByFaculty" || event.status === "sentByFinance") {
    flag = true;
  }
  console.log(flag);

  let isPublished = false;
  if (event.status === "approvedByDean") {
    isPublished = true;
  }

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
  const status2 = event.status.split("By");
  return (
    <div
      className="border border-dark rounded"
      style={{
        paddingLeft: "2rem",
        paddingTop: "1rem",
        paddingRight: "2rem",
        paddingBottom: "1rem",
        backgroundColor: `${bgColor}`,
        marginBottom: "1rem",
      }}
    >
      <p style={{ marginBottom: "5px", fontWeight: "500", color: "#423F3E" }}>
        {event.clubName}
      </p>
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
            color: `${text}`,
          }}
        >
          <div style={{ color: "#423F3E" }}>status</div>
          {status ||
            `${status2[0][0].toUpperCase()}${status2[0].slice(1)} By ${
              status2[1]
            }`}
        </div>
      </div>
      <SimpleModal state={open} draft={event} />
      <div>
        <CardActions style={{ padding: "0" }}>
          <Button
            style={{ marginLeft: "0" }}
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            onClick={downloadPdf}
          >
            Download Pdf
          </Button>
          {flag && (
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="secondary"
              disabled={!flag}
            >
              Edit
            </Button>
          )}

          {isPublished && (
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="secondary"
              disabled={flag}
              onClick={handleDownloadReceipt}
            >
              download Receipt
            </Button>
          )}
          {isPublished && (
            <Button
              className={classes.button}
              size="small"
              variant="outlined"
              color="primary"
              disabled={!isPublished}
              onClick={handleClickOpen}
            >
              Publish Event
            </Button>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Comments"}</DialogTitle>
            <DialogActions>
              <CommentSection event={event} />
            </DialogActions>
          </Dialog>
        </CardActions>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submit Event Form"}</DialogTitle>
        <DialogActions>
          <PublishForm eventName={event.eventName} clubName={event.clubName} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
