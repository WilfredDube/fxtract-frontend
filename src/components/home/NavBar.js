import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ececec",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "12%",
      paddingRight: "12%",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0%",
      paddingRight: "0%",
    },
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="white"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <div style={{ marginRight: 10 }}>
            <img
              src={process.env.PUBLIC_URL + "/logo-white.svg"}
              width={40}
              height={40}
              alt="logo"
            />
          </div>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Fxtract
          </Typography>
          <nav>
            <Button color="inherit" component={Link} to={"/"}>
              Home
            </Button>
            <Button color="inherit" component={Link} to={"/learn"}>
              Help
            </Button>
            <Button color="inherit" component={Link} to={"/fxt"}>
              Login
            </Button>
            <Button
              // href="/signup"
              color="primary"
              variant="contained"
              component={Link}
              to={"/fxt/signup"}
            >
              Sign up
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
