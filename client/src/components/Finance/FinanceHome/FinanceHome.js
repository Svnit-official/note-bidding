import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getPendingRequestsFinance } from "../../../actions/financeActions";
import FinanceCard from "../FinanceCard/FinanceCard";
import Loading from "../../Loaders/Load.js";
import "../../Events/Draft.css";
import "../../NavBar/Navbar.css";
var width = visualViewport.width / 4;
const FinanceHome = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("fin_profile"));
  const userFinance = JSON.parse(localStorage.getItem("fin_profile"));
  console.log(user);

  useEffect((e) => {
    dispatch(getPendingRequestsFinance(user.financeID));
  }, []);

  const d = useSelector((state) => state.financeReducer.requests);
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
              <a href="/finance/home">
                <li>Dashboard</li>
              </a>
              <a href="/finance/responded">
                <li>Responded</li>
              </a>
              <a href={`/finance/${userFinance.financeID}/details`}>
                <li>Details</li>
              </a>
            </ul>
          </div>
        </div>
        <div className="col-md-7 cardright">
          {d.map((event) => (
            <FinanceCard
              draft={event}
              status="Approved by Dean"
              color="#ADEECF"
              text="green"
            >
              Name
            </FinanceCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceHome;
