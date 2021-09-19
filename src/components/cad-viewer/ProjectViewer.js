import React, { useRef, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Fab } from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TimelineIcon from "@material-ui/icons/Timeline";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Breadcrumb from "./Breadcrumb";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import five from "../../five.png";
import FeatureDialog from "./FeatureDialog";
import ProcessDialog from "./ProcessDialog";
import UploadDialog from "./UploadDialog";
import SideBar from "./Sidebar";
import ProcessingPlanDialog from "./ProcessingPlanDialog";

const Box = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  const texture = useMemo(() => new THREE.TextureLoader().load(five), []);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [2, 2, 2] : [1.5, 1.5, 1.5]}
      onClick={(e) => setActive(!active)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" transparent side={THREE.DoubleSide}>
        <primitive attach="map" object={texture} />
      </meshBasicMaterial>
    </mesh>
  );
};

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
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    marginLeft: drawerWidth,
  },

  threeD: {
    margin: theme.spacing(1),
  },
  fab: {
    // margin: 0,
    top: "auto",
    left: "auto",
    bottom: 20,
    // marginBottom: 20,
    right: 20,
    position: "absolute",
  },
  fab1: {
    margin: 0,
    top: "auto",
    left: "auto",
    marginBottom: 20,
    right: 20,
    position: "fixed",
  },
}));

const ProjectViewer = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pdialogOpen, setPDialogOpen] = useState(false);
  const [ppdialogOpen, setPpDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Breadcrumb />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <SideBar />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.threeD} />
          <Grid container spacing={2}>
            <Grid item xs={11} sm={11} md={11}>
              <Canvas
                style={{
                  display: "flex",
                  // backgroundColor: "#000",
                  height: "700px",
                  margin: 0,
                  top: "auto",
                  left: "auto",
                  right: "auto",
                  bottom: "auto",
                }}
              >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                {/* <Box position={[-1.2, 0, 0]} /> */}
                <Box position={[0, 0, 0]} />
              </Canvas>
            </Grid>
            <Grid item className={classes.fab}>
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
                  >
                    <TimelineIcon />
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab
                    color="primary"
                    onClick={() => setPpDialogOpen(!ppdialogOpen)}
                  >
                    <AssignmentIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
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
    </>
  );
};

export default ProjectViewer;
