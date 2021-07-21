import React from "react";
import { withStyles } from "@material-ui/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Avatar,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { green, amber, red } from "@material-ui/core/colors";

const style = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "320px",
    height: "100%",
    backgroundColor: "#253053",
  },
};

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
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "20%",
    height: "auto",
    backgroundColor: "#253053",
    marginBottom: '0',
  },
}));

const MaybeSelectedIcon = ({ selected, Icon }) =>
  selected ? <Close /> : <Icon />;

const Sidebar = () => {
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
    <div className={classes.sideMenu} style={{padding: 30}}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Projects</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.panelDetails}>
          <List>
            {items.map((item, index) => (
              <div key={index}>
                <ListItem key={index} button dense>
                  <ListItemIcon>
                    <Avatar
                      className={[getColor(item.level), classes.size].join(" ")}
                    >
                      <Icon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    // secondary={item.timestamp.toLocaleString()}  style={{margin: "5px 0"}}
                  />
                  <ListItemSecondaryAction>
                    <MaybeSelectedIcon selected={item.selected} Icon={Close} />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{marginTop: '20px'}}>
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
                      className={[getColor(item.level), classes.size].join(" ")}
                    >
                      <Icon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    // secondary={item.timestamp.toLocaleString()}  style={{margin: "5px 0"}}
                  />
                  <ListItemSecondaryAction>
                    <MaybeSelectedIcon selected={item.selected} Icon={Close} />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default withStyles(style)(Sidebar);
