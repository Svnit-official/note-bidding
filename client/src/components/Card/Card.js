import React from "react";
import {Card,CardActions,CardContent,Typography,Button} from "@material-ui/core";

import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from './styles'


export default function SimpleCard({progress}) {
  const classes = useStyles();

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
          Club Name
        </Typography>
        <Typography variant="h5" component="h2">
          Event Name
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Detail info about the event
        </Typography>
        <Typography variant="body2" component="p">
          Some more information
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
        >
          Learn More
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
        >
          Download Pdf
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="secondary"
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
