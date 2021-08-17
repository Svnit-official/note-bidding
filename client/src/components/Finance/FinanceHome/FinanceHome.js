import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { useDispatch, useSelector } from "react-redux";
import { getPendingRequestsFinance } from "../../../actions/financeActions";
import FinanceCard from "../FinanceCard/FinanceCard";
import Loading from "../../Loaders/Load.js";

const FinanceHome = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("fin_profile"));
  console.log(user);

  useEffect((e) => {
    dispatch(getPendingRequestsFinance(user.financeID));
  }, []);

  const d = useSelector((state) => state.financeReducer.requests);

  return (
    <div>
      <NavBar />
      {!d ? <Loading /> : d.map((x) => <FinanceCard draft={x} />)}
    </div>
  );
};

export default FinanceHome;
