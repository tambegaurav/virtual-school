import React from "react";
import { Switch, Route } from "react-router-dom";
import { StudentVideo } from "./components/webRtc/StudentVideo";
import { WebRtcStu } from "./components/webRtc/WebRtcStu";
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
      <Route exact path="/studentRoom">
        {/* <WebRtcStu /> */}
        <StudentVideo />
      </Route>
    </Switch>
  );
};

export default Routes;
