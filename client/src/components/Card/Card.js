import React,{useState} from "react";
import {Card,CardActions,CardContent,Typography,Button,Accordion,AccordionSummary,AccordionDetails,Checkbox} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import useStyles from './styles'
import FileBase from 'react-file-base64';

export default function SimpleCard({progress}) {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      checking following I agree to give concent for that event.
          </Typography>
          <FileBase  type="file" multiple={false} style={{color:'blue'}} />
          <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          disabled={!checked}
        >Submit</Button>

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
