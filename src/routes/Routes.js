import React from "react";
import { Switch, Route } from "react-router-dom";
import Job from "../pages/Job";
import Login from "../pages/Login";
import JobDetail from "../pages/JobDetail";
import ProtectedRoute from "./ProtectedRoute";
const FourOhFourPage = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
};
const Routes = () => {
  return (
    <Switch>
       {/* //check tung ttruong hop. Chi hien thi cai dung dau tien*/}
      <Route exact path="/" component={Job} />
      <Route exact path="/job" component={Job} />
      <Route path="/login" exact component={Login} />
      
      <ProtectedRoute
        path="/detail/:id"
        exact
        render={(props) => <JobDetail name="bitna" />}
      />
      <Route path="*" component={FourOhFourPage} />
    </Switch>
  );
};
export default Routes;
