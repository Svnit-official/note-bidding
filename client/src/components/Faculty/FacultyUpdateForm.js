import React, { useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./updateStyle";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFacultyDetails } from "../../actions/auth";
const UpdateForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({});
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const id = sessionStorage.getItem("faculty");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFacultyDetails(id, postData, history));
    history.push(`/faculty/${id}/details`);
  };
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
          name="facultyName"
          variant="outlined"
          label="Username"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="facultyDesignation"
          variant="outlined"
          label="Designation"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="facultyEmail"
          variant="outlined"
          label="Email"
          fullWidth
        />
        <TextField
          name="facultyContact"
          variant="outlined"
          label="Contact No."
          onChange={handleChange}
          fullWidth
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
              setPostData({ ...postData, facultyPic: base64 })
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
