import React, { useContext } from "react";
import {
  Badge,
  Button,
  Divider,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { DeveloperBoard, Notifications } from "@material-ui/icons";
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
  const { isAuthenticated, signout } = useContext(AuthContext);
  const { count } = useContext(CADViewerContext);

  const logout = () => {
    signout();
  };

  if (!isAuthenticated) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <AppBar className={classes.appbar} position="fixed" elevation={0}>
        <Toolbar>
          <Typography style={{ color: "blue" }} component={Link} to={"/"}>
            FXT
          </Typography>
          <Typography style={{ flexGrow: 1, color: "blue" }}></Typography>
          <Tooltip title="Projects" arrow>
            <IconButton component={Link} to={"/projects"}>
              <DeveloperBoard />
            </IconButton>
          </Tooltip>
          <IconButton>
            <Tooltip title="Notifications" arrow>
              <Badge badgeContent={count} color="secondary">
                <Notifications />
              </Badge>
            </Tooltip>
          </IconButton>
          {/* <IconButton component={Link} to={"/profile"}> */}
          {/* <AccountCircle /> */}
          {/* <Avatar
              size={4}
              className={classes.green}
              sx={{ bgcolor: green[500] }}
            >
              {user.firstname[0]}
            </Avatar>
          </IconButton> */}
          <Button
            color="primary"
            variant="contained"
            size="small"
            style={{ marginLeft: 10 }}
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
