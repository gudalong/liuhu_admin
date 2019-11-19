import React, { Component } from "react";
// import { Button, Switch } from "antd";
import routes from "./configs/routes";
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* <Button type="primary">BUTTON</Button> */}


        <Switch>
          {routes.map(route => {
            return <Route {...route} />;
          })}
        </Switch>
      </Router>
    );
  }
}
