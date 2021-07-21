import {
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    background: "#fff",
  },
  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    padding: theme.spacing(2),
    background: "#fff",
  },
  paperHeader: {
    backgroundColor: theme.palette.background.default,
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  },
}));

function Breadcrumb() {
  const [projects, setProjects] = useState([
    { label: "Category 1", id: 1 },
    { label: "Category 2", id: 2 },
    { label: "Category 3", id: 3 },
  ]);

  const [files, setFiles] = useState([
    { label: "File 1.stp", id: 1 },
    { label: "Category 2", id: 2 },
    { label: "Category 3", id: 3 },
  ]);

  const classes = useStyles();

  return (
    <>
      {/* <Paper className={classes.appBar}  elevation={0}> */}
      {/* <Container style={{ display: "inline-flex" }}> */}
      {/* <Typography>Projects / {projects[0].label} / {files[0].label}</Typography> */}
      {/* </Container> */}
      {/* </Paper> */}
      {/* <CreateDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} /> */}

      <Paper className={classes.root} elevation={0}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick}>
            Projects
          </Link>
          <Link
            color="inherit"
            href="/getting-started/installation/"
            onClick={handleClick}
          >
            {projects[0].label}
          </Link>
          <Link
            color="textPrimary"
            href="/components/breadcrumbs/"
            onClick={handleClick}
            aria-current="page"
          >
            {files[0].label}
          </Link>
        </Breadcrumbs>
      </Paper>
    </>
  );
}

export default Breadcrumb;
