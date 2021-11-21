import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Fab, Snackbar, IconButton } from "@material-ui/core";
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
import Loading from "../project/Loading";

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
  },
  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
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
    // marginTop: "120px",
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    // marginLeft: drawerWidth,
  },

  threeD: {
    // margin: theme.spacing(1),
  },
  fab: {
    // margin: 0,
    top: "auto",
    // left: "auto",
    bottom: 20,
    // marginBottom: 20,
    right: 20,
    position: "absolute",
  },
  fab1: {
    // margin: 0,
    // top: "auto",
    // left: "auto",
    // marginBottom: 20,
    right: 20,
    // position: "fixed",
  },
  scene: {
    // width: "100px",
    // top: "auto",
    // bottom: 10,
    // left: "auto",
    // right: "auto",
    // position: "relative",
    // margin: 0,
    // top: "auto",
    // bottom: 20,
    // marginBottom: 20,
    // position: "relative",
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
      <div className={classes.root}>
        <CssBaseline />
        <Breadcrumb />
        {/* <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <SideBar />
        </Drawer> */}
        <div className={classes.content}>
          {/* <div className={classes.threeD} /> */}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3} md={3}>
              {/* <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
                anchor="left"
              > */}
              <SideBar />
              {/* </Drawer> */}
            </Grid>
            <Grid item xs={12} sm={8} md={8} className={classes.scene}>
              {/* <ThreeScene /> */}
              {/* <h2>{openfile.filename}</h2> */}
              {fileURL ? (
                <Canvas
                  style={{
                    display: "flex",
                    backgroundColor: "#000",
                    // height: "700px",
                    margin: 0,
                    top: "auto",
                    left: "auto",
                    right: "auto",
                    bottom: "auto",
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
              ) : (
                <Loading />
              )}
            </Grid>
            <Grid item className={classes.fab} xs={12} sm={1} md={1}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Fab
                    color="primary"
                    onClick={() => setUploadDialogOpen(!dialogOpen)}
                  >
                    <BackupIcon />
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab
                    color="primary"
                    onClick={() => setPDialogOpen(!dialogOpen)}
                  >
                    <PlayArrowIcon />
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab
                    color="primary"
                    onClick={() => setDialogOpen(!dialogOpen)}
                    disabled={paneldisabled}
                  >
                    <TimelineIcon />
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab
                    color="primary"
                    onClick={() => setPpDialogOpen(!ppdialogOpen)}
                    disabled={processplanButtonDisabled}
                  >
                    <AssignmentIcon />
                  </Fab>
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
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      /> */}
    </>
  );
};

export default ProjectViewer;
