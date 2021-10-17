import { Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { makeStyles } from "@material-ui/core";
import { CADViewerContext } from "../../contexts/CADViewerContext";

// function handleClick(event) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    background: "#fff",
    borderRadius: "0px",
  },
  appBar: {
    padding: theme.spacing(2),
    background: "#fff",
  },
  paperHeader: {
    backgroundColor: theme.palette.background.default,
  },
}));

function Breadcrumb() {
  const { projectname, openfile } = useContext(CADViewerContext);

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit">{projectname}</Typography>
          <Typography color="inherit">{openfile.filename}</Typography>
        </Breadcrumbs>
      </Paper>
    </>
  );
}

export default Breadcrumb;
