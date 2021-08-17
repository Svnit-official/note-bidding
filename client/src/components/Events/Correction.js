/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Card from "../Card/CorrectionCard";
import NavBar from "../NavBar/NavBar";
import BottomNav from "../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "../../actions/clubActions";
import Loading from "../Loaders/Load.js";

const SentRequest = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  console.log(user.clubID);
  useEffect(() => {
    dispatch(getRequest(user.clubID));
  }, []);
  const d = useSelector((state) => state.formReducer.submittedForms);
  console.log(d.requests);
  if (!d.requests) {
    return <Loading></Loading>;
  } else {
    return (
      <div>
        <NavBar />
        {d.requests.map((event) =>
          event.status === "sentByFaculty" ||
          event.status === "sentByFinance" ||
          event.status === "sentByDean" ? (
            <Card event={event}>Name</Card>
          ) : null
        )}
      </div>
    );
  }
};

export default SentRequest;
