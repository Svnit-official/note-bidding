/* eslint-disable no-unused-vars */
import React from "react";
import ClubForm from "./components/Club/Form";
import FinanceForm from "./components/Finance/Form";
import FacultyForm from "./components/Faculty/Form";
import DeanForm from "./components/Dean/Form";
import SubmitForm from "./components/SubmitForm/SubmitForm";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
const App = () => {
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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
