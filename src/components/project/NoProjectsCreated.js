import logo from "../../logo.svg";
import "../../App.css";

import React from "react";
import { Typography } from "@material-ui/core";

function NoProjectsCreated() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Typography color="primary">No project</Typography>
        </header>
      </div>
    </div>
  );
}

export default NoProjectsCreated;
