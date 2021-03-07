import React from "react";
import { Switch, Route } from "react-router-dom";
import AlertMsg from "components/AlertMsg";
import NotFoundPage from "components/NotFoundPage";
import HomePage from "containers/HomePage";
import LoginRegister from "containers/LoginRegister";
import PublicNavbar from "containers/PublicNavbar";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/loginregister" component={LoginRegister} />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    </>
  );
};

export default PublicLayout;
