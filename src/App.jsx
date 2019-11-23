import React, { Component } from "react";
import { noAuthRoutes, authRoutes } from "./configs/routes";
import BasicLayout from "./components/basic-layout";
// import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "./utils/history";
import "./index.less";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {noAuthRoutes.map((route, index) => {
            return <Route {...route} key={index} />;
          })}
          <BasicLayout>
            <Switch>
              {authRoutes.map((route, index) => {
                return <Route {...route} key={index} />;
              })}
            </Switch>
          </BasicLayout>
        </Switch>
      </Router>
    );
  }
}
