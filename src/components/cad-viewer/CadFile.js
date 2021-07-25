import {
  Avatar,
  Card,
  CardHeader,
  Icon,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import { amber, green, red, blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: 0,
    marginBottom: theme.spacing(2),
    // backgroundColor: blueGrey[50], //theme.palette.background.default,
    "& .MuiCardHeader-root": {
      display: "flex",
      padding: "4px",
      alignItems: "center",
    },
    "& .MuiCardHeader-avatar": {
      flex: "0 0 auto",
      marginLeft: "8px",
      marginRight: "8px",
    },
    "& .MuiCardHeader-action": {
      flex: "0 0 auto",
      alignSelf: "flex-start",
      // /* margin-top: -8px; */
      marginRight: "-8px",
    },
    "& .MuiCardHeader-content": {
      flex: "1 1 auto",
      overflowWrap: "anywhere",
    },
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

const CadFile = ({ file }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
    <Card className={classes.card} variant="outlined">
      <CardHeader
        title={file.name}
        // subheader={convertTimestamp(project.created_at)}
        action={
          <IconButton onClick={() => setOpen(!open)}>
            <Close size="small" />
          </IconButton>
        }
        avatar={
          <Avatar className={[getColor(file.level), classes.size].join(" ")}>
            <Icon />
          </Avatar>
        }
      />
    </Card>
  );
};

export default CadFile;
