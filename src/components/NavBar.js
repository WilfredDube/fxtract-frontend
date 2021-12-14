import React, { useContext } from "react";
import {
  Badge,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Notifications } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { green } from "@material-ui/core/colors";
import { CADViewerContext } from "../contexts/CADViewerContext";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#fff",
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const { isAuthenticated, signout, loading } = useContext(AuthContext);
  const { count } = useContext(CADViewerContext);

  const logout = () => {
    signout();
  };

  if (!isAuthenticated) {
    return <Redirect to={"/fxt/"} />;
  }

  return (
    <div>
      <AppBar className={classes.appbar} position="fixed" elevation={0}>
        <Toolbar>
          <div style={{ marginRight: 20 }}>
            <img
              src={process.env.PUBLIC_URL + "/logo-blue.svg"}
              width={40}
              height={40}
              alt="logo"
            />
          </div>
          <Button component={Link} to={"/fxt/projects"}>
            Projects
          </Button>
          <Typography style={{ flexGrow: 1, color: "blue" }}></Typography>
          <IconButton component={Link} to={"/fxt/notifications"}>
            <Tooltip title="Notifications" arrow>
              <Badge badgeContent={count} color="secondary">
                <Notifications />
              </Badge>
            </Tooltip>
          </IconButton>
          <Button
            color="primary"
            variant="contained"
            size="small"
            style={{ marginLeft: 10 }}
            onClick={logout}
          >
            {loading ? (
              <CircularProgress
                style={{
                  width: "30px",
                  height: "30px",
                  color: "white",
                }}
              />
            ) : (
              "Logout"
            )}
          </Button>
        </Toolbar>
        <Divider />
      </AppBar>
    </div>
  );
}
