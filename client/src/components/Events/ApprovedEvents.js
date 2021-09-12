/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Card from "../Card/EventCard";
import NavBar from "../NavBar/NavBar";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "../../actions/clubActions";
import Loading from "../Loaders/Load.js";
import "./Draft.css";
import "../NavBar/Navbar.css";
var width = visualViewport.width / 4;
const ApprovedEvents = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  useEffect(() => {
    dispatch(getRequest(user.clubID));
  }, []);
  const d = useSelector((state) => state.formReducer.submittedForms);
  if (!d.requests) {
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
              style={{ width: width }}
            >
              <ul>
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
                  <li>Corrections</li>
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
            {d.requests.map((event) =>
              event.status === "approvedByDean" ? (
                <Card
                  event={event}
                  status="Approved by Dean"
                  color="#ADEECF"
                  text="green"
                >
                  Name
                </Card>
              ) : null
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ApprovedEvents;
