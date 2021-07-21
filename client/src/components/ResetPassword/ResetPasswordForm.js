/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./input";
import useStyles from "./styles";
import { changeClubPassword } from "../../actions/clubActions";
import { changeFacultyPassword } from "../../actions/facultyActions";
import { changeDeanPassword, changeFinancePassword } from "../../actions/auth";

const initialState = {};
const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({});
  const handleShowPassword = () => setShowPassword(!showPassword);
  const classes = useStyles();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  let userID = "";
  let club = false,
    dean = false,
    faculty = false,
    finance = false;
  if (JSON.parse(localStorage.getItem("club_profile"))) {
    userID = JSON.parse(localStorage.getItem("club_profile")).user._id;
    club = true;
  } else if (JSON.parse(localStorage.getItem("fac_profile"))) {
    userID = JSON.parse(localStorage.getItem("fac_profile")).facultyID;
    faculty = true;
  } else if (JSON.parse(localStorage.getItem("fin_profile"))) {
    userID = JSON.parse(localStorage.getItem("fin_profile")).financeID;
    finance = true;
  } else if (JSON.parse(localStorage.getItem("dean_profile"))) {
    userID = JSON.parse(localStorage.getItem("dean_profile")).deanID;
    dean = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (club) {
      dispatch(changeClubPassword(userID, form, history));
    } else if (faculty) {
      dispatch(changeFacultyPassword(userID, form, history));
    } else if (finance) {
      dispatch(changeFinancePassword(userID, form, history));
    } else if (dean) {
      dispatch(changeDeanPassword(userID, form, history));
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              pass="pass"
              name="oldPassword"
              label="Old Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Input
              pass="pass"
              name="newPassword"
              label="New Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Input
              name="confirmPassword"
              pass="pass"
              label="Confirm Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>
          <Button
            type="submit"
            className={classes.loginButton}
            fullWidth
            color="primary"
            variant="contained"
          >
            Change Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
