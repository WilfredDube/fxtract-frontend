import "../../App.css";

import React from "react";
import { Typography, CircularProgress } from "@material-ui/core";

function Loading() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <CircularProgress style={{ margin: 50 }} />
          <Typography color="primary">Loading projects...</Typography>
        </header>
      </div>
    </div>
  );
}

export default Loading;
