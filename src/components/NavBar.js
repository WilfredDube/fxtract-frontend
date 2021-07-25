import React from "react";
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
import { Link } from "react-router-dom";
import ProjectCombobox from "./cad-viewer/ProjectCombobox";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#fff",
    // height: theme.mixins.toolbar.height,
  },
}));

export default function NavBar({ logo }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appbar} position="fixed" elevation={0}>
        <Toolbar>
          <Typography
            style={{ flexGrow: 1, color: "blue" }}
            component={Link}
            to="/"
          >
            FXT
          </Typography>
          <Typography style={{ color: "gray" }}>Projects:</Typography>
          <div style={{ flexGrow: 1, width: "300px" }}>
            <ProjectCombobox />
          </div>
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
            component={Link}
            to="/"
            size="small"
          >
            Logout
          </Button>
        </Toolbar>
        <Divider />
      </AppBar>
    </div>
  );
}
