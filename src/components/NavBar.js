import React, { useContext } from "react";
import {
  Badge,
  Button,
  Divider,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, Notifications } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#fff",
  },
}));

export default function NavBar({ logo }) {
  const classes = useStyles();
  const { isAuthenticated, signout } = useContext(AuthContext);

  const logout = () => {
    signout();
  };

  if (!isAuthenticated) {
    console.log("Not authenticated...");
    return <Redirect to={"/signin"} />;
  }

  return (
    <div>
      <AppBar className={classes.appbar} position="fixed" elevation={0}>
        <Toolbar>
          <Typography
            style={{ flexGrow: 1, color: "blue" }}
            component={Link}
            to={isAuthenticated ? "/projects" : "/signin"}
          >
            FXT
          </Typography>
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton>
            <AccountCircle />
          </IconButton>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
        <Divider />
      </AppBar>
    </div>
  );
}
