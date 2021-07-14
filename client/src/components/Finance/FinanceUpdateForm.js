import React, { useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./updateStyle";
const UpdateForm = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">Update your Profile</Typography>
        <TextField
          id="filled-required"
          name="username"
          variant="outlined"
          label="Username"
          fullWidth
        />
        <TextField
          name="designation"
          variant="outlined"
          label="Designation"
          fullWidth
        />
        <TextField name="email" variant="outlined" label="Email" fullWidth />
        <TextField
          name="contact"
          variant="outlined"
          label="Contact No."
          fullWidth
        />

        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} />
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
