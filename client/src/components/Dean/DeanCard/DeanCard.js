/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import {
  CardActions,
  Typography,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  Modal,
} from "@material-ui/core";
import SimpleModal from "./Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import {
  approvePendingRequestsDean,
  rejectPendingRequestsDean,
  sendBackPendingRequestsDean,
} from "../../../actions/deanActions";
import CommentSection from "../CommentSection/CommentSection";

export default function DeanCard({ draft }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const handleModalOpen = () => {
    console.log("i am here");
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
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
  let flag2 = false;
  if (draft.status.includes("rejected")) {
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
  const stat = draft.status.split("By");
  const x = progress(draft.status);

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
            color: `${textcolor}`,
          }}
        >
          <div style={{ color: "#423F3E" }}>status</div>
          {`${stat[0][0].toUpperCase()}${stat[0].slice(1)} By ${stat[1]}`}
        </div>
      </div>
      <div>
        <CardActions style={{ padding: "0" }}>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            onClick={downloadPdf}
            style={{ marginLeft: "0" }}
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
            variant="outlined"
            color="primary"
            onClick={handleOpen}
            style={{ marginLeft: "0" }}
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
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <SimpleModal draft={draft} />
        </Modal>
        {!flag ? (
          <>
            <Typography style={{ padding: "0", marginBottom: "8px" }}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
                style={{ paddingLeft: "0" }}
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
              style={{ marginLeft: "0" }}
            >
              Approve
            </Button>

            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleSendBack}
              style={{ marginLeft: "0" }}
            >
              Send Back for Correction
            </Button>
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleReject}
              style={{ marginLeft: "0" }}
            >
              reject
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
