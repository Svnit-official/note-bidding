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
import MultiStepForm from "../../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
//import {approvePendingRequestsFinance,rejectPendingRequestsFinance} from '../../../actions/financeActions';
import {
  approvePendingRequestsDean,
  rejectPendingRequestsDean,
  sendBackPendingRequestsDean,
} from "../../../actions/deanActions";
import CommentSection from "../CommentSection/CommentSection";

export default function DeanCard({ draft, display }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);

  const request = {
    id: draft._id,
  };
  const userDean = JSON.parse(localStorage.getItem("dean_profile"));
  let flag = false;
  if (draft.status !== "approvedByFinance") {
    flag = true;
  }
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

  const handleApprove = (e) => {
    e.preventDefault();
    dispatch(approvePendingRequestsDean(userDean.deanID, request, history));
  };

  const handleReject = (e) => {
    e.preventDefault();
    dispatch(rejectPendingRequestsDean(userDean.deanID, request, history));
  };

  const handleSendBack = (e) => {
    e.preventDefault();
    dispatch(sendBackPendingRequestsDean(userDean.deanID, request, history));
  };

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const x = progress(draft.status);

  return (
    <Card
      className={classes.root}
      style={{
        width: "100%",
        marginTop: "30px",
        background: (x === 4 && "green") || (x === 0 && "#FF6767"),
      }}
      elevation={6}
    >
      <MultiStepForm progress={progress(draft.status)} />
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
          {draft.eventDescription}
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
          onClick={downloadPdf}
        >
          Download Pdf
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleOpen}
        >
          Write a Comment
        </Button>
      </CardActions>
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
      {!flag ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              checking following I agree to give concent for that event.
            </Typography>
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="primary"
              disabled={!checked}
              onClick={handleApprove}
            >
              Approve
            </Button>

            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleSendBack}
            >
              Send Back for Correction
            </Button>
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleReject}
            >
              reject
            </Button>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </Card>
  );
}
