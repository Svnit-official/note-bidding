import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getPendingRequests } from "../../../actions/facultyActions";
import FacultyCard from "../FacultyCard/FacultyCard";
import Loading from "../../Loaders/Load.js";
//import {useLocation} from 'react-router-dom'

const FacultyHome = () => {
  const dispatch = useDispatch();
  ///const location = useLocation();
  const user = JSON.parse(localStorage.getItem("fac_profile"));
  // console.log(user);
  useEffect(() => {
    dispatch(getPendingRequests(user.facultyID));
  }, []);
  const d = useSelector((state) => state.facultyReducer.requests);
  console.log(d);

  return (
    <div>
      <NavBar />
      {!d ? <Loading /> : d.map((x, i) => <FacultyCard draft={x} key={i} />)}
    </div>
  );
};

export default FacultyHome;
