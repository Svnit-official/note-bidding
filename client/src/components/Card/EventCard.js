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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import {handleReceiptDownload} from '../../actions/clubActions'
import {useDispatch,useSelector} from 'react-redux';

export default function SimpleCard({ progress, event }) {
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
  
  

  let flag = false;
  if (event.status === "sentByFaculty" || event.status === "sentByFinance") {
    flag = true;
  }
  console.log(flag);
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
      </CardActions>
    </Card>
  );
}
