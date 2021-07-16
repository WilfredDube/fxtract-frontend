import React from "react";
import { Badge, Button, IconButton, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginRight: 30,
  },
  appbar: {
    background: "#fff",
    height: theme.mixins.toolbar.height,
  },
  toolbarMargin: theme.mixins.toolbar,
}));

export default function NavBar({ logo }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <Typography style={{ flexGrow: 1, color: "blue" }}>FXT</Typography>
          {/* <Typography style={{ flexGrow: 1, color: "gray" }}>Projects:</Typography> */}
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton>
            <AccountCircle />
          </IconButton>
          <Button color="primary" variant="outlined" component={Link} to="/projects">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
