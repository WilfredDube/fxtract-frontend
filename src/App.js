// import logo from "./logo.svg";
import "./App.css";

import NavBar from "./components/NavBar";
import ProjectHeader from "./components/project/ProjectHeader";
import React, { Component } from "react";
import { FxtractDataStore } from "./state/DataStore";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ProjectConnector } from "./components/project/ProjectConnector";

export default class App extends Component {
  render() {
    return (
      <Provider store={FxtractDataStore}>
        <Router>
          <NavBar />
          <ProjectHeader />
          <Switch>
            <Route path="/" component={ProjectConnector} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
