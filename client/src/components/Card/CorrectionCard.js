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
import { useHistory,Link } from "react-router-dom";
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

     
    <div className="border border-dark rounded" style={{paddingLeft:"2rem",paddingTop:"1rem",paddingRight:"2rem",paddingBottom:"1rem",backgroundColor:"#E8F6EF",marginBottom:"1rem"}} >
    <span style={{fontWeight:"400",color:"#A7C4BC"}}>Event Name</span>
    <h1 style={{fontWeight:"700"}}>Quriosity 7.0</h1>
    <div className="d-flex mt-4">
        <div style={{fontWeight:"600"}}>
        <Link className="" style={{textDecoration:"none",color:"black"}}>Send to Dashboard</Link>
        </div>
       <div className="" style={{marginLeft:"auto",fontWeight:"600",color:"#71EFA3"}}>
        <div style={{color:"#A7C4BC",marginLeft:"1.5rem"}}>status</div>
        Approved
       </div>
    </div>
    <div>
    <button type="button" class="m-2 btn btn-success">Send</button>
    <button type="button" class="m-2 btn btn-danger">Delete</button>
    <button type="button" class="m-2 btn btn-warning">Edit</button>
    </div>
</div>


    // <Card
    //   className={classes.root}
    //   style={{ width: "100%", marginTop: "30px" }}
    //   elevation={6}
    // >
    //   <MultiStepForm progress={progress(event.stat)} />
    //   <CardContent>
    //     <Typography
    //       className={classes.title}
    //       color="textSecondary"
    //       gutterBottom
    //     >
    //       {event.clubName}
    //     </Typography>
    //     <Typography variant="h5" component="h2">
    //       {event.eventName}
    //     </Typography>
    //     <Typography className={classes.pos} color="textSecondary">
    //       {event.message}
    //     </Typography>
    //     <Typography variant="body2" component="p">
    //       {event.eventDate}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button
    //       className={classes.button}
    //       size="small"
    //       variant="contained"
    //       color="primary"
    //       onClick={downloadPdf}
    //     >
    //       Download Pdf
    //     </Button>
    //     <Button
    //       className={classes.button}
    //       size="small"
    //       variant="contained"
    //       color="secondary"
    //       disabled={!flag}
    //       onClick={handleClickOpen}
    //     >
    //       Edit
    //     </Button>
    //     <Button
    //       className={classes.button}
    //       size="small"
    //       variant="contained"
    //       color="secondary"
    //       disabled={!flag}
    //       onClick={handleSubmit}
    //     >
    //       Submit
    //     </Button>
    //     <CommentSection id={event._id}/>
    //     <Dialog
    //       open={open}
    //       onClose={handleClose}
    //       aria-labelledby="alert-dialog-title"
    //       aria-describedby="alert-dialog-description"
    //     >
    //       <DialogTitle id="alert-dialog-title">
    //         {"Submit Event Form"}
    //       </DialogTitle>
    //       <DialogActions>
    //         <CorrectRequestForm id={event._id} />
    //       </DialogActions>
    //     </Dialog>
    //   </CardActions>
    // </Card>
  );
}
