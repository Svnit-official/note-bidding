import React, { useEffect } from "react";
import NavBar from "../../NavBar/NavBar";
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getRespondedRequests } from "../../../actions/facultyActions";
import FacultyCard from "../FacultyCard/FacultyCard";
import { CircularProgress, Typography } from "@material-ui/core";
import Loading from "../../Loaders/Load.js";
import "../../Events/Draft.css";
import "../../NavBar/Navbar.css";
var width = visualViewport.width / 4;
const FacultyResponded = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("fac_profile"));
  // console.log(user);
  useEffect(() => {
    // dispatch(getPendingRequests(user.facultyID))
    dispatch(getRespondedRequests(user.facultyID));
  }, []);
  const d = useSelector((state) => state.facultyReducer.requests);
  console.log(d);
  const userFaculty = JSON.parse(localStorage.getItem("fac_profile"));

  if (!d) {
    return <Loading />;
  }
  return (
    <div>
      <NavBar />
      <div className="row container-fluid" style={{ paddingTop: "100px" }}>
        <div className="col-md-5 col-sm-12" style={{ backgroundColor: "" }}>
          <div id="sidenavper" className="sidenavper" style={{ width: width }}>
            <ul>
              <a href="/faculty/home">
                <li>Dashboard</li>
              </a>
              <a href="/faculty/responded">
                <li>Responded</li>
              </a>
              <a href={`/faculty/${userFaculty.facultyID}/details`}>
                <li>Details</li>
              </a>
              <a href="/faculty/resetPassword">
                <li>Reset Password</li>
              </a>
            </ul>
          </div>
        </div>
        <div className="col-md-7 cardright">
          {d.map((event) => (
            <FacultyCard
              draft={event}
              status="Approved by Dean"
              color="#ADEECF"
              text="green"
            >
              Name
            </FacultyCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyResponded;
