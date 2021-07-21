import { Button, Container, Grid, InputAdornment, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import CreateDialog from "../view/CreateDialog";
import { AddOutlined, Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paperHeader: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function ProjectHeader() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const classes = useStyles();

  return (
    <>
      <Paper elevation={0} square className={classes.paperHeader}>
        <Container>
          <div>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  placeholder="Search projects"
                  variant="outlined"
                  size="small"
                  className="inputRounded"
                  InputProps={{
                    startAdornment:
                      (<InputAdornment position="start">
                      <Search/>
                      </InputAdornment>)                    
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <div style={{ flexGrow: 4 }}>
                  <Button
                    justify="flex-end"
                    color="primary"
                    variant="contained"
                    style={{
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: 17,
                      width: 190,
                    }}
                    onClick={() => setDialogOpen(!dialogOpen)}
                  >
                    <AddOutlined/>
                    Create project
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Paper>
      <CreateDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
}

export default ProjectHeader;
