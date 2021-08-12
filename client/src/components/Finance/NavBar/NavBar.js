import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Fade,
  Paper,
} from "@material-ui/core";
import SimpleDrawer from "./SwipableMenu/SwipableMenu";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Popper from "@material-ui/core/Popper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined"; // import {useLocations} from 'react-router-dom';
import { deanDetails, financeDetails } from "../../../actions/auth";
// import decode from 'jwt-decode';

const NavBar = () => {
  const classes = useStyles();
  const open = true;
  const [openPopper, setOpenPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();
  const id = sessionStorage.getItem("finance");
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(financeDetails(id));
  }, []);
  const d = useSelector((state) => state.authReducer.financeDetail);
  console.log(d);
  const handleClick = (newPlacement) => (event) => {
    console.log("clicked");
    setAnchorEl(event.currentTarget);
    setOpenPopper((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleClose = () => {
    setOpenPopper(false);
  };
  const userFinance = JSON.parse(localStorage.getItem("fin_profile"));
  console.log(userFinance);
  const [user, setUser] = useState(userFinance);
  console.log(user);
  const history = useHistory();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/club/login");
    setUser(null);
  };

  //   useEffect(() => {
  //     const token = user?.token;
  //     if(token){
  //         const decodedToken = decode(token);
  //         if(decodedToken.exp * 1000 < new Date().getTime()) logout();
  //     }
  //     //setUser(JSON.parse(localStorage.getItem('profile')))
  //     // eslint-disable-next-line
  // }, [location])
  if (!d) {
    return <div>Loading</div>;
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary" elevation={6}>
        <Toolbar>
          <SimpleDrawer state={open} />
          <Typography variant="h6" className={classes.title}>
            SVNIT FORUM
          </Typography>
          <Button onClick={handleClick("bottom-end")}>
            <Avatar
              alt="Remy Sharp"
              src="/broken-image.jpg"
              className={classes.orange}
            >
              {d.financeName[0]}
            </Avatar>
          </Button>
        </Toolbar>
      </AppBar>
      <Popper
        open={openPopper}
        onClose={handleClose}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper} elevation={6}>
              <Avatar
                className={classes.avatar}
                align="center"
                alt="Remy Sharp"
                src="/broken-image.jpg"
              >
                {d.financeName[0]}
              </Avatar>
              <Typography className={classes.typography}>
                {d.financeName}
              </Typography>
              <Typography className={classes.typography}>
                {d.financeEmail}
              </Typography>
              <Link
                style={{ textDecoration: "none" }}
                to={`/finance/${d._id}/details`}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  <AccountCircleOutlinedIcon fontSize="small" />
                  Profile
                </Button>
              </Link>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={logout}
              >
                <LockOutlinedIcon fontSize="small" /> Logout
              </Button>
              <br></br>

              <Link style={{ textDecoration: "none" }} to="/dean/resetPassword">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  <VpnKeyOutlinedIcon fontSize="small" />
                  &nbsp;Change Password
                </Button>
              </Link>
              <br></br>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default NavBar;
