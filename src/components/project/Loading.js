import "../../App.css";

import React from "react";
import { Typography, CircularProgress, Container } from "@material-ui/core";

function Loading({ message }) {
  return (
    <Container component="main" maxWidth="xs">
      <header className="loading">
        <CircularProgress style={{ margin: 50 }} />
        <Typography color="primary">{message}</Typography>
      </header>
    </Container>
  );
}

export default Loading;
