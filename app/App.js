import React, { Component } from "react";
import "./App.scss";
import { Switch, Link, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
