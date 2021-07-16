import { Button, Grid, Paper, TextField } from "@material-ui/core";
import React from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paperHeader: {
    padding: theme.spacing(4),
    display: "flex",
  },
}));

function ProjectHeader() {
  const classes = useStyles();

  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.paperHeader}>
        <Grid container alignItems="center">
          <Grid item style={{flexGrow: 1, marginRight: 50}}>
            <TextField
              placeholder="Search projects"
              variant="outlined"
              size="small"
              className="inputRounded"
              fullWidth
            />
          </Grid>
          <Grid item >
            <Button
              color="primary"
              variant="contained"
              style={{
                textTransform: "none",
                fontWeight: "bold"
              }}
            >
              Create project
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export default ProjectHeader;