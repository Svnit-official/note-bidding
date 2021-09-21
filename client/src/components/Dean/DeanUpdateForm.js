import React, { useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./updateStyle";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateDeanDetails } from "../../actions/auth";
const UpdateForm = ({ details }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({});
  const [name, setName] = useState(details.deanName);
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const id = sessionStorage.getItem("dean");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDeanDetails(id, postData, history));
    history.push(`/dean/${id}/details`);
  };
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Update your Profile</Typography>
        <TextField
          id="filled-required"
          name="deanName"
          variant="outlined"
          label="Username"
          fullWidth
          onChange={handleChange}
          value={postData.deanName || details.deanName}
        />
        <TextField
          name="deanDesignation"
          variant="outlined"
          label="Designation"
          onChange={handleChange}
          fullWidth
          value={postData.deanDesignation || details.deanDesignation}
        />
        <TextField
          name="deanEmail"
          variant="outlined"
          label="Email"
          onChange={handleChange}
          fullWidth
          value={postData.deanEmail || details.deanEmail}
        />
        <TextField
          name="deanContact"
          variant="outlined"
          label="Contact No."
          onChange={handleChange}
          fullWidth
          value={postData.deanContact || details.deanContact}
        />
        <Typography align="left">Signature Pic</Typography>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, signature: base64 })
            }
          />
        </div>
        <Typography align="left">Profile Pic</Typography>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, deanPic: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Update
        </Button>
      </form>
    </Paper>
  );
};

export default UpdateForm;
