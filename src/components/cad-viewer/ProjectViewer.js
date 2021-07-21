import React, { useRef, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import { AccountCircle, Close, Notifications } from "@material-ui/icons";
import {
  Badge,
  Button,
  IconButton,
  Avatar,
  Icon,
  ListItemSecondaryAction,
  TextField,
  Grid,
  Fab,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { green, amber, red } from "@material-ui/core/colors";
import Breadcrumb from "./Breadcrumb";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
// import './App.css'

import five from "../../five.png";

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
    backgroundColor: theme.palette.background.default,
    border: 0,
    paddingTop:0,
    marginTop: "124px",
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    marginLeft: drawerWidth,
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
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  panelDetails: {
    flexDirection: "column",
    height: "auto",
    overflow: "auto",
  },
  threeD: {
    margin: theme.spacing(2),
  },
  fab: {
    margin: 0,
    top: "auto",
    left: "auto",
    bottom: 0,
    right: 20,
    // position: "fixed",
  },
}));

const MaybeSelectedIcon = ({ selected, Icon }) =>
  selected ? <Close /> : <Icon />;

const ProjectViewer = () => {
  const classes = useStyles();
  const items = [
    { name: "First Item", level: 1, timestamp: new Date() },
    { name: "Second Item", level: 1, timestamp: new Date() },
    { name: "Third Item", level: 2, timestamp: new Date() },
    { name: "Third Item", level: 2, timestamp: new Date() },
    { name: "Third Item", level: 1, timestamp: new Date() },
    { name: "Third Item", level: 3, timestamp: new Date() },
    { name: "Third Item", level: 1, timestamp: new Date() },
    { name: "Third Item", level: 2, timestamp: new Date() },
    { name: "Third Item", level: 1, timestamp: new Date() },
    { name: "Third Item", level: 1, timestamp: new Date() },
  ];

  const getColor = (level) => {
    switch (level) {
      case 1:
        return `${classes.red}`;
      case 2:
        return `${classes.orange}`;
      case 3:
        return `${classes.green}`;
      default:
        return ``;
    }
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} elevation={0}>
          <Toolbar>
            <Typography
              style={{ flexGrow: 1, color: "blue" }}
              component={Link}
              to="/"
              noWrap
            >
              FXT
            </Typography>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton>
              <AccountCircle />
            </IconButton>
            <Button color="primary" variant="outlined" component={Link} to="/">
              Logout
            </Button>
          </Toolbar>
          <Divider />
        </AppBar>
        <Breadcrumb />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          {/* <div className={classes.toolbar} />u */}
          {/* <Divider />
          <List>
            {["View all projects"].map((text, index) => (
              <ListItem button key={text} component={Link} to="/projects" >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List> */}
          <Divider />
          <List>
            {/* {["All mail"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            {/* <Accordion style={{ marginTop: "20px" }} elevation={0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Projects</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelDetails}>
                <List>
                  {items.map((item, index) => (
                    <div key={index}>
                      <ListItem key={index} button dense>
                        <ListItemText
                          primary={item.name}
                          // secondary={item.timestamp.toLocaleString()}  style={{margin: "5px 0"}}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion> */}
            <Accordion style={{ marginTop: "20px" }} elevation={0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Project CAD Files</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelDetails}>
                <List>
                  {items.map((item, index) => (
                    <div key={index}>
                      <ListItem key={index} button dense>
                        <ListItemIcon>
                          <Avatar
                            className={[
                              getColor(item.level),
                              classes.size,
                            ].join(" ")}
                          >
                            <Icon />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={item.name}
                          // secondary={item.timestamp.toLocaleString()}  style={{margin: "5px 0"}}
                        />
                        <ListItemSecondaryAction>
                          <MaybeSelectedIcon
                            selected={item.selected}
                            Icon={Close}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ marginTop: "20px" }} elevation={0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Face Relationship</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelDetails}>
                <List>
                  {items.map((item, index) => (
                    <div key={index}>
                      <ListItem key={index} button dense>
                        <ListItemIcon>
                          <Avatar
                            className={[
                              getColor(item.level),
                              classes.size,
                            ].join(" ")}
                          >
                            <Icon />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={item.name}
                          // secondary={item.timestamp.toLocaleString()}  style={{margin: "5px 0"}}
                        />
                        <ListItemSecondaryAction>
                          <MaybeSelectedIcon
                            selected={item.selected}
                            Icon={Close}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ marginTop: "20px" }} elevation={0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Bend Feature Summary</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelDetails}>
                <List>
                  {items.map((item, index) => (
                    <div key={index}>
                      <ListItem key={index} button dense>
                        <ListItemIcon>
                          <Avatar
                            className={[
                              getColor(item.level),
                              classes.size,
                            ].join(" ")}
                          >
                            <Icon />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={item.name}
                          // secondary={item.timestamp.toLocaleString()}  style={{margin: "5px 0"}}
                        />
                        <ListItemSecondaryAction>
                          <MaybeSelectedIcon
                            selected={item.selected}
                            Icon={Close}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.threeD} />
          <Grid container>
          <Grid item md={11}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[2.5, 0, 0]} />
          </Canvas>
          </Grid>
          <Grid item md={1}>
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
        </Grid></Grid>
        </main>
      </div>
    </>
  );
};

export default ProjectViewer;
