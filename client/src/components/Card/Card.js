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
  Modal
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import  {useHistory,Link}  from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import UpdateDraft from "../Events/UpdateDraft";
import { sendRequest, deleteRequest } from "../../actions/clubActions";
import CommentSection from "./CommentSection";
import SimpleModal from "./Modal"
export default function SimpleCard({ draft }) {
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
    // return(
    //   <Modal state={true} />
    // )
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 =()=>{
    setOpen(true);
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



  
  return (
    
    <div className="border border-dark rounded" style={{paddingLeft:"2rem",paddingTop:"1rem",paddingRight:"2rem",paddingBottom:"1rem",backgroundColor:"#E8F6EF",marginBottom:"1rem"}} onClick={handleClickOpen}>
    
    <span style={{fontWeight:"400",color:"#A7C4BC"}}>{draft.clubName}</span>
    <h1 style={{fontWeight:"700"}}> {draft.eventName}</h1>
    <div className="d-flex mt-4">
        <div style={{fontWeight:"600"}}>
        <Link className="" style={{textDecoration:"none",color:"black"}}>Send to Dashboard</Link>
        </div>
       <div className="" style={{marginLeft:"auto",fontWeight:"600",color:"#71EFA3"}}>
        <div style={{color:"#A7C4BC",marginLeft:"1.5rem"}}>status</div>
        Approved
       </div>      
    </div>
    <SimpleModal state={open} draft={draft}/> 
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
    //   <MultiStepForm progress={progress(draft.stat)} />
    //   <CardContent>
    //     <Typography
    //       className={classes.title}
    //       color="textSecondary"
    //       gutterBottom
    //     >
    //       {draft.clubName}
    //     </Typography>
    //     <Typography variant="h5" component="h2">
    //       {draft.eventName}
    //     </Typography>
    //     <Typography className={classes.pos} color="textSecondary">
    //       {draft.message}
    //     </Typography>
    //     <Typography variant="body2" component="p">
    //       {draft.eventDate}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button
    //       className={classes.button}
    //       size="small"
    //       variant="contained"
    //       color="primary"
    //       onClick={sendingRequest}
    //     >
    //       Send Request
    //     </Button>
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
    //       onClick={handleClickOpen}
    //     >
    //       Edit
    //     </Button>
    //     <Button
    //       className={classes.button}
    //       size="small"
    //       variant="contained"
    //       color="secondary"
    //       onClick={handleDelete}
    //     >
    //       Delete
    //     </Button>
    //     {/* <CommentSection id={draft._id}/> */}
    //     <Dialog
    //       open={open}
    //       onClose={handleClose}
    //       aria-labelledby="alert-dialog-title"
    //       aria-describedby="alert-dialog-description"
    //     >
    //       <DialogTitle id="alert-dialog-title">
    //         {"Comments"}
    //       </DialogTitle>
    //       <DialogActions>
    //         <CommentSection draft={draft} />
            
    //       </DialogActions>
    //     </Dialog>
    //   </CardActions>
    //   <Dialog
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="alert-dialog-title"
    //     aria-describedby="alert-dialog-description"
    //   >
    //     <DialogTitle id="alert-dialog-title">{"Submit Event Form"}</DialogTitle>
    //     <DialogActions>
    //       <UpdateDraft id={draft._id} />
    //     </DialogActions>
    //   </Dialog>
    // </Card>
  );
}
