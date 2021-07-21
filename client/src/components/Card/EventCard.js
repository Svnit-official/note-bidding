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

export default function SimpleCard({ progress, event }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
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
      </CardActions>
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
          <FileBase type="file" multiple={false} style={{ color: "blue" }} />
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            disabled={!checked}
          >
            Submit
          </Button>

          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="secondary"
          >
            Edit Request
          </Button>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}
