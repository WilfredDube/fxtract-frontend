import React from "react";
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
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { green, amber, red } from "@material-ui/core/colors";
import Breadcrumb from "./Breadcrumb";

// 3D
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import five from "../../five.png";
import '../../App.css'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: "#fff",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
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
}));

const MaybeSelectedIcon = ({ selected, Icon }) =>
  selected ? <Close /> : <Icon />;

export default function PermanentDrawerLeft() {
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
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {["Projects", "Starred"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Accordion style={{ marginTop: "20px" }} elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>CAD files</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.panelDetails}>
              <List>
                {items.map((item, index) => (
                  <div key={index}>
                    <ListItem key={index} button dense>
                      <ListItemIcon>
                        <Avatar
                          className={[getColor(item.level), classes.size].join(
                            " "
                          )}
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
        <Breadcrumb />
        <div className={classes.threeD} />
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[2.5, 0, 0]} />
        </Canvas>
      </main>
    </div>
  );
}

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
}
