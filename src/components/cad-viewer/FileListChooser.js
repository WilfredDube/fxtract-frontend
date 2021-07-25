import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import { Avatar, Container, Icon } from "@material-ui/core";
import { amber, green, red, blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    // backgroundColor: blueGrey[50], //theme.palette.background.default,
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
}));

export default function FileListChooser() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const items = [
    { name: "STAR BENDING SEQUENCE.stp", level: 1, timestamp: new Date() },
    { name: "Z bending sequence.stp", level: 1, timestamp: new Date() },
    {
      name: "inside bends bending sequence.stp",
      level: 2,
      timestamp: new Date(),
    },
    {
      name: "AA00001106762_AO_REINFORCEMENT1 2d.stp",
      level: 2,
      timestamp: new Date(),
    },
    {
      name: "AA00001155784_DO_ASSY SUPPORT ANTENNA 02.stp",
      level: 1,
      timestamp: new Date(),
    },
    {
      name: "AA00001185070_EO_ASSY SUPPOR HVAC.stp",
      level: 3,
      timestamp: new Date(),
    },
    { name: "90.step", level: 1, timestamp: new Date() },
    { name: "S_bend.step", level: 2, timestamp: new Date() },
    { name: "n bending sequence.stp", level: 1, timestamp: new Date() },
    { name: "Z bending sequence.stp", level: 1, timestamp: new Date() },
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
    <Container className={classes.root}>
      <List>
        {items
          .filter((item) => item.level !== 3)
          .map((item) => {
            const labelId = `checkbox-list-label-${3}`;

            return (
              <ListItem
                key={item.name}
                role={undefined}
                dense
                button
                onClick={handleToggle(item.name)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${item.name}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <Avatar
                      className={[getColor(item.level), classes.size].join(" ")}
                    >
                      <Icon />
                    </Avatar>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
}
