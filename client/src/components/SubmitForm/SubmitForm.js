import React, { useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { clubFormSubmit , clubFormDraft } from "../../actions/clubActions";
import { useHistory } from "react-router-dom";

const SubmitForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  const clubID = user?.clubID;
  const [postData, setPostData] = useState({
    headName: "",
    eventName: "",
    eventDate: "",
    comments: "",
    pdf: "",
    clubName: "",
  });
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log(postData);
    dispatch(clubFormSubmit({ ...postData },clubID, history));
  };

  const saveDraft = (e) => {
    dispatch(clubFormDraft({...postData} , clubID , history));
    history.push("/club/home");
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">Create an Event</Typography>
        <TextField
          id="filled-required"
          name="headName"
          variant="outlined"
          label="Title"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="eventName"
          variant="outlined"
          label="Message"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="eventDate"
          type="date"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="comments"
          variant="outlined"
          multiline
          rows={3}
          label="Message"
          fullWidth
          onChange={handleChange}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, pdf: base64 })}
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
        <Button
          className={classes.buttonSubmit}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          // type="submit"
          onClick={saveDraft}
        >
          Save as Draft
        </Button>
        <Button variant="contained" color="secondary" fullWidth size="large">
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default SubmitForm;
