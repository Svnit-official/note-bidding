import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./input";
import useStyles from "./styles";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const classes = useStyles();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form className={classes.form} onSubmit={() => {}}>
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

export default Form;
