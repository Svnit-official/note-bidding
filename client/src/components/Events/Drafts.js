/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getDraftRequest } from "../../actions/clubActions";
import Loading from "../Loaders/Load.js";

const Home = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  console.log(user.clubID);
  useEffect(() => {
    dispatch(getDraftRequest(user.clubID));
  }, []);
  const d = useSelector((state) => state.formReducer.drafts);
  console.log(d);
  if (!d) {
    return <Loading></Loading>;
  } else {
    return (
      <div>
        <NavBar />
        {d.drafts.map((draft) => (
          <Card draft={draft}>Name</Card>
        ))}
      </div>
    );
  }
};

export default Home;
