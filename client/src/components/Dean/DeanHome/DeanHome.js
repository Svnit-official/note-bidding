import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getPendingRequestsDean } from "../../../actions/deanActions";
import DeanCard from "../DeanCard/DeanCard";
import Loading from "../../Loaders/Load.js";

const DeanHome = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("dean_profile"));
  console.log(user);
  useEffect(() => {
    dispatch(getPendingRequestsDean(user.deanID));
  }, []);

  const d = useSelector((state) => state.deanReducers.requests);
  console.log(d);

  return (
    <div>
      <NavBar />
      {!d ? <Loading /> : d.map((x) => <DeanCard draft={x} />)}
    </div>
  );
};

export default DeanHome;
