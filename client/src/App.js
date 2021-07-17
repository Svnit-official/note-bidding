/* eslint-disable no-unused-vars */
import React from "react";
import ClubForm from "./components/Club/Form";
import FinanceForm from "./components/Finance/Form";
import FacultyForm from "./components/Faculty/Form";
import DeanForm from "./components/Dean/Form";
import SubmitForm from "./components/SubmitForm/SubmitForm";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import DeanDashboard from "./components/Dean/Profile";
import FacultyDashboard from "./components/Faculty/Profile";
import FinanceDashboard from "./components/Finance/Profile";

const App = () => {

  const user  = JSON.parse(localStorage.getItem('club_profile'));

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Redirect to="/club/login"></Redirect>}
        ></Route>
        <Route path="/club/login" component={ClubForm} />
        <Route path="/finance/login" component={FinanceForm} />
        <Route path="/faculty/login" component={FacultyForm} />
        <Route path="/dean/login" component={DeanForm} />
        <Route path="/club/submit" component={SubmitForm} />
        <Route path="/club/home" component={()=> !user ? <ClubForm /> : <Home />} />
        <Route path="/dean/dashboard" component={DeanDashboard} />
        <Route path="/faculty/dashboard" component={FacultyDashboard} />
        <Route path="/finance/dashboard" component={FinanceDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
