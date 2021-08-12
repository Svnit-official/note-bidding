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
} from "@material-ui/core";
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import { sendRequest } from "../../actions/clubActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CorrectRequestForm from "../Events/CorrectRequestForm";
import CommentSection from "./CommentSection";

export default function SimpleCard({ event }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);

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
    <Card
      className={classes.root}
      style={{ width: "100%", marginTop: "30px" }}
      elevation={6}
    >
      <MultiStepForm progress={progress(event.stat)} />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {event.clubName}
        </Typography>
        <Typography variant="h5" component="h2">
          {event.eventName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {event.message}
        </Typography>
        <Typography variant="body2" component="p">
          {event.eventDate}
        </Typography>
      </CardContent>
      <CardActions>
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
        <CommentSection id={event._id}/>
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
    </Card>
  );
}
