import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Category from "./Category";
import Home from "./Home";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/categories">
            <Category />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
