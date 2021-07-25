import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panelDetails: {
    flexDirection: "column",
    height: "auto",
    overflow: "auto",
  },
}));

const SideBarAccordion = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion style={{ marginTop: "10px" }} elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.panelDetails}>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SideBarAccordion;
