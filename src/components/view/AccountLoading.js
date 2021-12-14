import "../../App.css";

import React, { useContext } from "react";
import {
  Typography,
  CircularProgress,
  CssBaseline,
  Container,
} from "@material-ui/core";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router";

function AccountLoading() {
  const { currLocation, isAuthenticated, authErr, loading } =
    useContext(AuthContext);

  if (authErr != null) {
    return <div>{authErr}</div>;
  }

  if (!isAuthenticated && !loading) {
    return <Redirect to={"/fxt/signin"} />;
  }

  if (!loading && isAuthenticated) {
    return <Redirect to={currLocation} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="App">
        <header className="mid">
          <CircularProgress
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <Typography color="primary" style={{ fontSize: "2rem", margin: 50 }}>
            Fxtract
          </Typography>
        </header>
      </div>
    </Container>
  );
}

export default AccountLoading;
