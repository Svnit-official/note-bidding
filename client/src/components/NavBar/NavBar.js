import React, { useState } from "react";

import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import SimpleDrawer from "./SwipableMenu/SwipableMenu";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import {useLocations} from 'react-router-dom';
// import decode from 'jwt-decode';

const NavBar = () => {
  const classes = useStyles();
  const open = true;

  const userClub = JSON.parse(localStorage.getItem("club_profile"));
  const userFaculty = JSON.parse(localStorage.getItem("fac_profile"));
  const userFinance = JSON.parse(localStorage.getItem("fin_profile"));
  const userDean = JSON.parse(localStorage.getItem("dean_profile"));

  const [user, setUser] = useState(
    userClub || userFaculty || userFinance || userDean
  );
  console.log(user);
  const dispatch = useDispatch();
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

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary" elevation={6}>
        <Toolbar>
          <SimpleDrawer state={open} />
          <Typography variant="h6" className={classes.title}>
            SVNIT FORUM
          </Typography>
          <Avatar
            alt="Remy Sharp"
            src="/broken-image.jpg"
            className={classes.orange}
          >
            B
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
