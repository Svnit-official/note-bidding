import React, { useState } from "react";

import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import SimpleDrawer from "./SwipableMenu/SwipableMenu";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import {useLocations} from 'react-router-dom';
// import decode from 'jwt-decode';

const NavBar = () => {
  const classNamees = useStyles();
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
    // <div classNameName={classNamees.root}>
    //   <AppBar position="static" color="primary" elevation={6}>
    //     <Toolbar>
    //       <SimpleDrawer state={open} />
    //       <Typography variant="h6" classNameName={classNamees.title}>
    //         SVNIT FORUM
    //       </Typography>
    //       <Avatar
    //         alt="Remy Sharp"
    //         src="/broken-image.jpg"
    //         classNameName={classNamees.orange}
    //       >
    //         B
    //       </Avatar>
    //     </Toolbar>
    //   </AppBar>
    // </div>
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid m-2 ">
        <a className="navbar-brand" href="#">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/NIT_Surat_Logo.svg/1200px-NIT_Surat_Logo.svg.png" width="40px" alt="" className="d-inline-block align-text-top" />
          SVNIT EVENT PORTAL
        </a>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            {/* <button class="btn waves-effect waves-light" type="submit" name="action">
              <i class="material-icons right">Login</i>
            </button> */}
            <a className="nav-link " aria-current="page" href="">Login</a>
          </li>
        </ul>
      </div>
    </nav>





  );
};

export default NavBar;
