import {
  Avatar,
  Card,
  CardHeader,
  Icon,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { amber, green, red } from "@material-ui/core/colors";
import DeleteDialog from "./DeleteDialog";
import { CADViewerContext } from "../../contexts/CADViewerContext";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: 0,
    marginBottom: theme.spacing(2),
    // backgroundColor: theme.palette.background.default,
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

const convertTimestamp = (timestamp) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const milliseconds = timestamp * 1000; // 1575909015000
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleDateString("en-UK", options); //2019-12-9 10:30:15

  return humanDateFormat;
};

const CadFile = ({ file }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { setBreadCrumbFile } = useContext(CADViewerContext);

  const getColor = (level) => {
    switch (level) {
      case 0:
        return `${classes.red}`;
      case 1:
        return `${classes.orange}`;
      case 2:
        return `${classes.green}`;
      default:
        return ``;
    }
  };

  const handleSelection = () => {
    setBreadCrumbFile(file, file.feature_props.process_level);
  };

  return (
    <>
      <Card
        className={classes.card}
        variant="outlined"
        onClick={handleSelection}
      >
        <CardHeader
          title={file.filename}
          subheader={convertTimestamp(file.created_at)}
          action={
            <IconButton onClick={() => setOpen(!open)}>
              <Close size="small" />
            </IconButton>
          }
          avatar={
            <Avatar
              className={[
                getColor(file.feature_props.process_level),
                classes.size,
              ].join(" ")}
            >
              <Icon />
            </Avatar>
          }
        />
        <DeleteDialog
          title={file.filename}
          fileid={file.id}
          open={open}
          setOpen={setOpen}
        />
      </Card>
    </>
  );
};

export default CadFile;
