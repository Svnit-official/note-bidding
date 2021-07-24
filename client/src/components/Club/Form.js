/* eslint-disable no-unused-vars */
import React, { useState ,useEffect} from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./input";
import useStyles from "./styles";
import { clubsignin } from "../../actions/auth";

const initialState = {
  username: "",
  password: "",
};
const ClubForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const classes = useStyles();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(clubsignin(form, history))
  };
 
  
  // const checkAuthority = () => {
  //   if(d){
  //     console.log("authorized");
  //   }else{
  //     console.log("not authorized")
  //   }
  // }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Club Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="username"
              label="Username"
              handleChange={handleChange}
              type="text"
            />
            <Input
              name="password"
              label="Password"
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
            LogIn
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ClubForm;
