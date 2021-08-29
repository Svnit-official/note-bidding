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
  DialogActions
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import {handleReceiptDownload} from '../../actions/clubActions'
import {useDispatch,useSelector} from 'react-redux';
import PublishForm from '../PublishForm/PublishForm';
import CommentSection from './CommentSection';

export default function SimpleCard({ event }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("club_profile"));

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
      console.log(user.clubID , event._id);
      const x = user.clubID
      const y = {
        id : event._id
      }
   dispatch(handleReceiptDownload(x , y));

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let flag = false;
  if (event.status === "sentByFaculty" || event.status === "sentByFinance") {
    flag = true;
  }
  console.log(flag);

  let isPublished = false;
  if(event.status === "approvedByDean"){
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
  
  return (
    <Card
      className={classes.root}
      style={{ width: "100%", marginTop: "30px" }}
      elevation={6}
    >
      <MultiStepForm progress={progress(event.status)} />
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
        >
          Edit
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="secondary"
          disabled={flag}
          onClick = {handleDownloadReceipt}
        >
          download Receipt
        </Button>
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
          <DialogTitle id="alert-dialog-title">
            {"Comments"}
          </DialogTitle>
          <DialogActions>
            <CommentSection draft={event} />
            
          </DialogActions>
        </Dialog>
      </CardActions>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submit Event Form"}</DialogTitle>
        <DialogActions>
          <PublishForm eventName={event.eventName} clubName={event.clubName}/>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
