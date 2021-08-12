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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiStepForm from "../../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import {
  approvePendingRequestsFinance,
  rejectPendingRequestsFinance,
  sendBackPendingRequestsFinance,
} from "../../../actions/financeActions";

export default function FinanceCard({ draft }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const request = {
    id: draft._id,
  };
  const userFinance = JSON.parse(localStorage.getItem("fin_profile"));
  let flag = false;
  if (draft.status !== "approvedByFaculty") {
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
    console.log(userFinance.financeID);

    dispatch(
      approvePendingRequestsFinance(userFinance.financeID, request, history)
    );
  };

  const handleReject = () => {
    dispatch(
      rejectPendingRequestsFinance(userFinance.financeID, request, history)
    );
  };

  const handleSendBack = () => {
    dispatch(
      sendBackPendingRequestsFinance(userFinance.financeID, request, history)
    );
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
        return null;
    }
  };
  return (
    <Card
      className={classes.root}
      style={{ width: "100%", marginTop: "30px" }}
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
        <Typography className={classes.pos} color="textSecondary"></Typography>
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
      </CardActions>
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
              Reject
            </Button>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </Card>
  );
}
