import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/">
        <HomePage />
      </PrivateRoute>
      <Route path="/signin">
        <SignInPage />
      </Route>
    </Switch>
  );
};

export default Routes;
