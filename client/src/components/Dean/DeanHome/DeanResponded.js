import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar";
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getRespondedRequestsDean } from "../../../actions/deanActions";
import DeanCard from "../DeanCard/DeanCard";
import Loading from "../../Loaders/Load.js";
import "../../Events/Draft.css";
import "../../NavBar/Navbar.css";
var width = visualViewport.width / 4;
const DeanResponded = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("dean_profile"));
  console.log(user);
  useEffect(() => {
    dispatch(getRespondedRequestsDean(user.deanID));
  }, []);
  const userDean = JSON.parse(localStorage.getItem("dean_profile"));
  const req = useSelector((state) => state.deanReducers);
  const d = req.requests;
  // const x = req.disabled;
  console.log(d);
  if (!d) {
    return <Loading />;
  }
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
              <a href="/dean/home">
                <li>Dashboard</li>
              </a>
              <a href="/dean/responded">
                <li>Responded</li>
              </a>
              <a href={`/dean/${userDean.deanID}/details`}>
                <li>Details</li>
              </a>
            </ul>
          </div>
        </div>
        <div className="col-md-7 cardright">
          {d.map((event) => (
            <DeanCard
              draft={event}
              status="Approved by Dean"
              color="#ADEECF"
              text="green"
            >
              Name
            </DeanCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeanResponded;
