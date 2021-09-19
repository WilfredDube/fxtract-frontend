import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";

import { makeStyles } from "@material-ui/core";
import { AddOutlined, Search } from "@material-ui/icons";
import { ProjectContext } from "../../contexts/ProjectContext";
import CreateDialog from "../view/CreateDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paperHeader: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  textfield: {
    "& .MuiOutlinedInput-root": {
      position: "relative",
      borderRadius: 0,
    },
  },
}));

const ProjectHeader = () => {
  const { addProject, findProject } = useContext(ProjectContext);

  const [dialogOpen, setDialogOpen] = useState(false);

  const classes = useStyles();

  const handleSearch = (e) => {
    findProject(e.target.value);
  };

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
                  className={classes.textfield}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearch}
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
                      // width: 190,
                    }}
                    onClick={() => setDialogOpen(!dialogOpen)}
                  >
                    <AddOutlined />
                    Create project
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Paper>
      <CreateDialog
        addProject={addProject}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
};

export default ProjectHeader;
