/* eslint-disable no-unused-vars */
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import ClubForm from "./components/Club/Form";
import FinanceForm from "./components/Finance/Form";
import FacultyForm from "./components/Faculty/Form";
import DeanForm from "./components/Dean/Form";
import SubmitForm from "./components/SubmitForm/SubmitForm";
import Home from "./components/Club/Home/Home";
import DeanDashboard from "./components/Dean/Profile";
import FacultyDashboard from "./components/Faculty/Profile";
import FinanceDashboard from "./components/Finance/Profile";
import Drafts from "./components/Events/Drafts";
import Correction from "./components/Events/Correction";
import SentEvents from "./components/Events/SentRequests";
import Rejected from "./components/Events/Rejected";
import FacultyHome from "./components/Faculty/FacultyHome/FacultyHome";
import ResetPassword from "./components/ResetPassword/ResetPasswordForm";
import FinanceHome from "./components/Finance/FinanceHome/FinanceHome";
import DeanHome from "./components/Dean/DeanHome/DeanHome";
import FacultyResponded from "./components/Faculty/FacultyHome/FacultyResponded";
import FinanceResponded from "./components/Finance/FinanceHome/FinanceResponded";
import DeanResponded from "./components/Dean/DeanHome/DeanResponded";
import ApprovedEvents from "./components/Events/ApprovedEvents";
const App = () => {
  const userClub = JSON.parse(localStorage.getItem("club_profile"));
  const userDean = JSON.parse(localStorage.getItem("dean_profile"));
  const userFaculty = JSON.parse(localStorage.getItem("fac_profile"));
  const userFinance = JSON.parse(localStorage.getItem("fin_profile"));

  const authClub = () => {
    if (userClub) {
      return <SubmitForm />;
    }
    return <Redirect to="/club/login"></Redirect>;
  };

  return (
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Redirect to="/club/login"></Redirect>}
        ></Route>
        {/* ..............club route............. */}
        <Route path="/club/login" exact component={ClubForm} />
        <Route
          path="/club/submit"
          component={() =>
            !userClub ? <Redirect to="/club/login" /> : <SubmitForm />
          }
        />
        <Route
          path="/club/home"
          component={() =>
            !userClub ? <Redirect to="/club/login" /> : <Home />
          }
        />
        <Route
          path="/club/drafts"
          component={() =>
            !userClub ? <Redirect to="/club/login" /> : <Drafts />
          }
        />
        <Route
          path="/club/correction"
          component={() =>
            !userClub ? <Redirect to="/club/login" /> : <Correction />
          }
        />
        <Route
          path="/club/sent"
          component={() =>
            !userClub ? <Redirect to="/club/login" /> : <SentEvents />
          }
        />
        <Route
          path="/club/rejected"
          component={() =>
            !userClub ? <Redirect to="/club/login" /> : <Rejected />
          }
        />
        <Route
          path="/club/approved"
          component={() =>
            !userClub ? <Redirect to="/club/login" /> : <ApprovedEvents />
          }
        />
        <Route
          path="/club/resetPassword"
          component={() =>
            !userClub ? <Redirect to="/club/login" /> : <ResetPassword />
          }
        />

        {/* ..............faculty route........... */}

        <Route path="/faculty/login" component={FacultyForm} />
        <Route
          path="/faculty/:id/details"
          component={() =>
            !userFaculty ? (
              <Redirect to="/faculty/login" />
            ) : (
              <FacultyDashboard />
            )
          }
        />
        <Route
          path="/faculty/home"
          component={() =>
            !userFaculty ? <Redirect to="/faculty/login" /> : <FacultyHome />
          }
        />
        <Route
          path="/faculty/resetPassword"
          component={() =>
            !userFaculty ? <Redirect to="/faculty/login" /> : <ResetPassword />
          }
        />
        {/* ..............finance route ........... */}
        <Route path="/finance/login" component={FinanceForm} />
        <Route
          path="/finance/:id/details"
          component={() =>
            !userFinance ? (
              <Redirect to="/finance/login" />
            ) : (
              <FinanceDashboard />
            )
          }
        />
        <Route
          path="/finance/resetPassword"
          component={() =>
            !userFinance ? <Redirect to="/finance/login" /> : <ResetPassword />
          }
        />
        {/* ..............dean route................*/}
        <Route path="/dean/login" component={DeanForm} />
        <Route
          path="/dean/:id/details"
          component={() =>
            !userDean ? <Redirect to="/dean/login" /> : <DeanDashboard />
          }
        />
        <Route
          path="/dean/resetPassword"
          component={() =>
            !userDean ? <Redirect to="/dean/login" /> : <ResetPassword />
          }
        />
        <Route
          path="/faculty/:id/details"
          component={() =>
            !userFaculty ? (
              <Redirect to="/faculty/login" />
            ) : (
              <FacultyDashboard />
            )
          }
        />
        <Route
          path="/faculty/home"
          component={() =>
            !userFaculty ? <Redirect to="/faculty/login" /> : <FacultyHome />
          }
        />
        <Route
          path="/faculty/responded"
          component={() =>
            !userFaculty ? (
              <Redirect to="/faculty/login" />
            ) : (
              <FacultyResponded />
            )
          }
        />

        {/* ..............finance route ........... */}
        <Route path="/finance/login" component={FinanceForm} />
        <Route
          path="/finance/:id/details"
          component={() =>
            !userFinance ? (
              <Redirect to="/finance/login" />
            ) : (
              <FinanceDashboard />
            )
          }
        />
        <Route
          path="/finance/home"
          component={() =>
            !userFinance ? <Redirect to="/finance/login" /> : <FinanceHome />
          }
        />
        <Route
          path="/finance/responded"
          component={() =>
            !userFinance ? (
              <Redirect to="/faculty/login" />
            ) : (
              <FinanceResponded />
            )
          }
        />

        {/* ..............dean route................*/}
        <Route path="/dean/login" component={DeanForm} />
        <Route
          path="/dean/:id/details"
          component={() =>
            !userDean ? <Redirect to="/dean/login" /> : <DeanDashboard />
          }
        />
        <Route
          path="/dean/home"
          component={() =>
            !userDean ? <Redirect to="/dean/login" /> : <DeanHome />
          }
        />
        <Route
          path="/dean/responded"
          component={() =>
            !userDean ? <Redirect to="/dean/login" /> : <DeanResponded />
          }
        />

        {/* <Route path="/club/submit" component={authClub} /> */}
        {/*
        <Route path="/club/home" component={()=> !userClub ? <Redirect to="/club/login" /> : <Home />} />
        <Route path="/dean/dashboard" component={() => !userDean ? <Redirect to="/dean/login" /> : <DeanDashboard />} />
        <Route path="/faculty/dashboard" component={() => !userFaculty ? <Redirect to="/faculty/login" /> : <FacultyDashboard />} />
        <Route path="/finance/dashboard" component={() => !userFinance ? <Redirect to="/finance/login" /> : <FinanceDashboard />} />
  */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
