import React, { useState, useEffect } from "react";
import "./Navbar.css";
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
  var [change, setchange] = useState(0);
  var [dopen, setdopen] = useState(false);
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

  // console.log(window);

  // var height=visualViewport.height;
  // console.log(height);
  // console.log(width/4)
  // var  width = 400px;
  // window.onresize= ()=>{
  //    width = visualViewport.width/4;
  //   console.log(width);
  //   setchange(()=>change++);
  //   //console.log(document.querySelector("#sidenav").style.width);
  // }
  function drawerclosed(e) {
    e.preventDefault();
    console.log("HELLO");
    setdopen(!dopen);
  }
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
    //       </Avatar>
    //     </Toolbar>
    //   </AppBar>
    // </div>

    <div>
      {dopen ? (
        <div id="sidenav" className="sidenav" style={{ width: "350px" }}>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingLeft: "0px",
            }}
          >
            <a href="/club/home">
              <li>Home</li>
            </a>
            <a href="/club/drafts">
              <li>Drafts</li>
            </a>
            <a href="/club/sent">
              <li>Sent</li>
            </a>
            <a href="/club/corrections">
              <li>Correction</li>
            </a>
            <a href="/club/rejected">
              <li>Rejected</li>
            </a>
            <a href="/club/approved">
              <li>Approved</li>
            </a>
            <a href="/club/details">
              <li>Club Profile</li>
            </a>
          </ul>
        </div>
      ) : (
        <div></div>
      )}
      <nav className="navbar navbar-light navcolor fixed-top">
        <div className="container-fluid m-2">
          <a className="navbar-brand" href="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
              onClick={drawerclosed}
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/NIT_Surat_Logo.svg/1200px-NIT_Surat_Logo.svg.png"
              width="40px"
              alt=""
              className="d-inline-block align-text-top"
            />
            <span style={{ fontWeight: "700" }}>SVNIT</span> EVENT PORTAL
          </a>
          <ul className="nav ">
            <li className="nav-item">
              <a href="/club/login">
                <button
                  type="button"
                  class="btn border-dark border-3 "
                  style={{ fontWeight: "700" }}
                >
                  Logout
                </button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
