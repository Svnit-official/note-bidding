import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getRespondedRequestsFinance } from "../../../actions/financeActions";
import FinanceCard from "../FinanceCard/FinanceCard";
import { CircularProgress } from "@material-ui/core";

const FinanceHome = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("fin_profile"));
  console.log(user);

  useEffect((e) => {
    dispatch(getRespondedRequestsFinance(user.financeID));
  }, []);

  const d = useSelector((state) => state.financeReducer.requests);

  return (
    <div>
      <NavBar />
      {!d ? <CircularProgress /> : d.map((x) => <FinanceCard draft={x} />)}
    </div>
  );
};

export default FinanceHome;
