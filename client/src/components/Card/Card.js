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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import UpdateDraft from "../Events/UpdateDraft";
import { sendRequest, deleteRequest } from "../../actions/clubActions";
export default function SimpleCard({ progress, draft }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendingRequest = () => {
    console.log("sendRequest", draft._id);
    dispatch(sendRequest(draft._id, history));
  };
  const handleDelete = () => {
    dispatch(deleteRequest(draft._id, history));
  };
  return (
    <Card
      className={classes.root}
      style={{ width: "100%", marginTop: "30px" }}
      elevation={6}
    >
      <MultiStepForm progress={progress} />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {draft.clubName}
        </Typography>
        <Typography variant="h5" component="h2">
          {draft.eventName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {draft.message}
        </Typography>
        <Typography variant="body2" component="p">
          {draft.eventDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
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
      </CardActions>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submit Event Form"}</DialogTitle>
        <DialogActions>
          <UpdateDraft id={draft._id} />
        </DialogActions>
      </Dialog>
    </Card>
  );
}
