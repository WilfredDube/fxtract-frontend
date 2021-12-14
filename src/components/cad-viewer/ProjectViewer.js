import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Fab, Snackbar, IconButton, Tooltip } from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TimelineIcon from "@material-ui/icons/Timeline";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Breadcrumb from "./Breadcrumb";
import ThreeScene from "./ThreeScene";

import FeatureDialog from "./FeatureDialog";
import ProcessDialog from "./ProcessDialog";
import UploadDialog from "./UploadDialog";
import SideBar from "./Sidebar";
import ProcessingPlanDialog from "./ProcessingPlanDialog";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import { Close } from "@material-ui/icons";
import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "../view/ErrorBoundary";

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginLeft: drawerWidth,
    background: "#fff",
  },
  drawer: {
    border: 0,
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    top: "auto",
    backgroundColor: theme.palette.background.default,
    border: 0,
    paddingTop: 0,
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },

  fab: {
    top: "auto",
    bottom: 20,
    right: 20,
    position: "absolute",
  },
}));

const ProjectViewer = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pdialogOpen, setPDialogOpen] = useState(false);
  const [ppdialogOpen, setPpDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const {
    paneldisabled,
    processplanButtonDisabled,
    snackOpen,
    setSnackOpen,
    message,
    fileURL,
  } = useContext(CADViewerContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <div>
        <CssBaseline />
        <Breadcrumb />
        <div className={classes.content}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3} md={3}>
              <SideBar />
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              {fileURL ? (
                <ErrorBoundary>
                  <Canvas
                    style={{
                      display: "flex",
                      margin: 0,
                    }}
                  >
                    <ambientLight intensity={0.5} />
                    <spotLight
                      position={[10, 10, 10]}
                      angle={0.15}
                      penumbra={1}
                    />
                    <pointLight position={[-10, -10, -10]} />
                    <ThreeScene url={fileURL} />
                  </Canvas>
                </ErrorBoundary>
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item className={classes.fab} xs={12} sm={1} md={1}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Tooltip title="Upload" arrow placement="left">
                    <Fab
                      color="primary"
                      onClick={() => setUploadDialogOpen(!dialogOpen)}
                    >
                      <BackupIcon />
                    </Fab>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Process files" arrow placement="left">
                    <Fab
                      color="primary"
                      onClick={() => setPDialogOpen(!dialogOpen)}
                    >
                      <PlayArrowIcon />
                    </Fab>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Bend features" arrow placement="left">
                    <span>
                      <Fab
                        color="primary"
                        onClick={() => setDialogOpen(!dialogOpen)}
                        disabled={paneldisabled}
                      >
                        <TimelineIcon />
                      </Fab>
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Processing plan" arrow placement="left">
                    <span>
                      <Fab
                        color="primary"
                        onClick={() => setPpDialogOpen(!ppdialogOpen)}
                        disabled={processplanButtonDisabled}
                      >
                        <AssignmentIcon />
                      </Fab>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <FeatureDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <ProcessDialog dialogOpen={pdialogOpen} setDialogOpen={setPDialogOpen} />
      <ProcessingPlanDialog
        dialogOpen={ppdialogOpen}
        setDialogOpen={setPpDialogOpen}
      />
      <UploadDialog
        dialogOpen={uploadDialogOpen}
        setDialogOpen={setUploadDialogOpen}
      />
      <Snackbar
        open={snackOpen}
        message={message}
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
      />
    </>
  );
};

export default ProjectViewer;
