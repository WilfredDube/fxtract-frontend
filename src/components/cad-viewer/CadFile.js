import {
  Avatar,
  Card,
  CardHeader,
  CircularProgress,
  Icon,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { amber, green, red } from "@material-ui/core/colors";
import DeleteDialog from "./DeleteDialog";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import { convertTimestamp } from "../../utils/utils";

import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";

const useStyles = makeStyles((theme) => ({
  action: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
    margin: theme.spacing(3),
  },
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

const CadFile = ({ file }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { setBreadCrumbFile, deleteCadFile, loading, downloadOBJ } =
    useContext(CADViewerContext);
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });

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
    downloadOBJ(file);
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
            // <IconButton onClick={() => setOpen(!open)}>
            //   <Close size="small" />
            // </IconButton>
            !loading ? (
              <IconButton
                className={classes.action}
                classes={iconBtnStyles}
                onClick={() => setOpen(!open)}
              >
                <Close size="small" />
              </IconButton>
            ) : (
              <IconButton className={classes.action} classes={iconBtnStyles}>
                <CircularProgress
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </IconButton>
            )
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
          deleteCadFile={deleteCadFile}
        />
      </Card>
    </>
  );
};

export default CadFile;
