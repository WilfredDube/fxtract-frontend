import React from "react";
import { Fab, Grid, makeStyles } from "@material-ui/core";
// import { AddIcon } from "@material-ui/icons/Add";
import { green, amber, red } from "@material-ui/core/colors";
import NavBar from "../NavBar";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  panelDetails: {
    flexDirection: "column",
    height: 250,
    overflow: "auto",
  },
  orange: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[800],
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  size: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  fab: {
    margin: 0,
    top: "auto",
    left: "auto",
    bottom: 20,
    right: 20,
    position: "fixed",
  },
  fab1: {
    margin: 0,
    // top: "auto",
    // left: "auto",
    bottom: "auto",
    right: 20,
    position: "fixed",
  },
}));

function ProjectViewer() {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div>
        <Sidebar />
        <Grid container direction="column"  spacing={2} className={classes.fab}>
          <Grid item>
            <Fab color="primary">{/* <AddIcon /> */}</Fab>
          </Grid>
          <Grid item>
            <Fab color="primary">{/* <AddIcon /> */}</Fab>
          </Grid>
          <Grid item>
            <Fab color="primary">{/* <AddIcon /> */}</Fab>
          </Grid>
          <Grid item>
            <Fab color="primary">{/* <AddIcon /> */}</Fab>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ProjectViewer;

{/* <FormControl className={classes.control}>
            {/* <InputLabel htmlFor="projects">Projects</InputLabel> */}
            <Select
              value={category.id}
              // onChange={onChange}
              inputProps={{
                name: "projects",
                id: "projects",
              }}
            >
              <MenuItem value="Category 5" selected>
                <em>Category 5</em>
              </MenuItem>
              {projects.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}