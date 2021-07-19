/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import BottomNav from "../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "../../actions/clubActions";

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
    return <h1>Loading</h1>;
  } else {
    return (
      <div>
        <NavBar />
        {d.requests.map((draft) => (
          <Card draft={draft}>Name</Card>
        ))}
        <BottomNav />
      </div>
    );
  }
};

export default SentRequest;