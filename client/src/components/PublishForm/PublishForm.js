import React, { useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {publishEvent} from '../../actions/clubActions';

const SubmitForm = ({eventName,clubName}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  const clubId = user?.clubID;
  const [postEvent, setpostEvent] = useState({eventName, clubName,clubId});
 
 
  const handleChange = (e) => {
    setpostEvent({ ...postEvent, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
   dispatch(publishEvent(clubId,postEvent));
  };




  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">Publish Event</Typography>
        <TextField
          variant="outlined"
          label="club Name"
          fullWidth
          value={clubName}
          disabled
        />
        <TextField
          variant="outlined"
          label="Event Name"
          value={eventName}
          fullWidth
          disabled
        />
        <TextField
        label="description"
          fullWidth
          variant="outlined"
        />
        <TextField
         id="filled-required"
          name="registerationLink"
          variant="outlined"
          label="Registration Link"
          fullWidth
          onChange={handleChange}
        />
        <TextField
         id="filled-required"
          name="web"
          variant="outlined"
          label="Web Address"
          fullWidth
          onChange={handleChange}
        />
               <TextField
         id="filled-required"
          name="socialMedia"
          variant="outlined"
          label="Social Media Link"
          fullWidth
          onChange={handleChange}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setpostEvent({ ...postEvent, eventPoster: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          // type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" fullWidth size="large" >
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default SubmitForm;
