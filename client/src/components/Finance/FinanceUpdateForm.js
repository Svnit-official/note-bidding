import React, { useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./updateStyle";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFinanceDetails } from "../../actions/auth";
const UpdateForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({});
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const id = sessionStorage.getItem("finance");
  console.log(id);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFinanceDetails(id, postData, history));
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
          name="financeName"
          variant="outlined"
          label="Username"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="financeDesignation"
          variant="outlined"
          label="Designation"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="financeEmail"
          variant="outlined"
          label="Email"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="financeContact"
          variant="outlined"
          label="Contact No."
          fullWidth
          onChange={handleChange}
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
              setPostData({ ...postData, financePic: base64 })
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
