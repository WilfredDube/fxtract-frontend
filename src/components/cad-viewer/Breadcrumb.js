import { Paper, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { makeStyles } from "@material-ui/core";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import { encryptData } from "../../utils/utils";

// function handleClick(event) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    background: "#fff",
    borderRadius: "0px",
  },
  appBar: {
    padding: theme.spacing(2),
    background: "#fff",
  },
  paperHeader: {
    backgroundColor: theme.palette.background.default,
  },
  whiteText: {
    fontSize: "bold",
  },
}));

function Breadcrumb() {
  const { projectname, openfile } = useContext(CADViewerContext);

  const salt = process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac120003";

  useEffect(() => {
    localStorage.setItem("_p", encryptData(projectname, salt));
    localStorage.setItem("_o", encryptData(JSON.stringify(openfile), salt));
  }, [projectname, openfile, salt]);

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit" className={classes.whiteText}>
            {projectname}
          </Typography>
          <Typography color="inherit">{openfile.filename}</Typography>
        </Breadcrumbs>
      </Paper>
    </>
  );
}

export default Breadcrumb;
