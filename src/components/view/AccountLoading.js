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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function AccountLoading() {
  const classes = useStyles();
  const { currLocation, isAuthenticated, loading } = useContext(AuthContext);

  if (!isAuthenticated && !loading) {
    return <Redirect to={"/signin"} />;
  }

  if (!loading && isAuthenticated) {
    return <Redirect to={currLocation} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <header className="App-header">
          <CircularProgress
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <Typography color="primary" style={{ fontSize: "2rem", margin: 50 }}>
            Fxtract...
          </Typography>
        </header>
      </div>
    </Container>
  );
}

export default AccountLoading;
