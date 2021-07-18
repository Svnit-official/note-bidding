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

  const userClub  = JSON.parse(localStorage.getItem('club_profile'));
  const userDean = JSON.parse(localStorage.getItem('dean_profile'));
  const userFaculty = JSON.parse(localStorage.getItem('fac_profile'));
  const userFinance = JSON.parse(localStorage.getItem('fin_profile'));

  const authClub = () => {
    if(userClub){
      return <SubmitForm />
  }
return  <Redirect to="/club/login"></Redirect> ;
}


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
        {/* <Route path="/club/submit" component={authClub} /> */}
        <Route path="/club/home" component={()=> !userClub ? <Redirect to="/club/login" /> : <Home />} />
        <Route path="/dean/dashboard" component={() => !userDean ? <Redirect to="/dean/login" /> : <DeanDashboard />} />
        <Route path="/faculty/dashboard" component={() => !userFaculty ? <Redirect to="/faculty/login" /> : <FacultyDashboard />} />
        <Route path="/finance/dashboard" component={() => !userFinance ? <Redirect to="/finance/login" /> : <FinanceDashboard />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
