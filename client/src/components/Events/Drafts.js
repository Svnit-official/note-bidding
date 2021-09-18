/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getDraftRequest } from "../../actions/clubActions";
import Loading from "../Loaders/Load.js";
import "../NavBar/Navbar.css";
import "./Draft.css";
var width = visualViewport.width / 4;

const Home = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  useEffect(() => {
    dispatch(getDraftRequest(user.clubID));
  }, []);
  const d = useSelector((state) => state.formReducer.drafts);
  if (!d) {
    return <Loading></Loading>;
  } else {
    return (
      <div>
        <NavBar />
        <div className="row container-fluid" style={{ paddingTop: "100px" }}>
          <div className="col-md-5 col-sm-12" style={{ backgroundColor: "" }}>
            <div
              id="sidenavper"
              className="sidenavper"
              style={{ width: width, backgroundColor: "#BDD9F2" }}
            >
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
                <a href="/club/correction">
                  <li>Correction</li>
                </a>
                <a href="/club/rejected">
                  <li>Rejected</li>
                </a>
                <a href="/club/approved">
                  <li>Approved</li>
                </a>
                <a href="/club/resetPassword">
                  <li>ResetPassword</li>
                </a>
              </ul>
            </div>
          </div>
          <div className="col-md-7 cardright">
            {d.drafts.map((draft) => (
              <Card draft={draft}>Name</Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
