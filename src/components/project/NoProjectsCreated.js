import "../../App.css";

import React from "react";
import { Typography } from "@material-ui/core";
import { CloudOffSharp } from "@material-ui/icons";

function NoProjectsCreated() {
  return (
    <div>
      {/* <div className="App"> */}
      <header className="App-header">
        <CloudOffSharp color="primary" fontSize="large" />
        <Typography color="primary">No projects</Typography>
      </header>
      {/* </div> */}
    </div>
  );
}

export default NoProjectsCreated;
