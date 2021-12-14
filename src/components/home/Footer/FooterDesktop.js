import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Typography, Icon } from "@material-ui/core";

import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  myLink: {
    color: "white",
    textDecoration: "none",
    fontFamily: "Sora",
    fontWeight: "200",
    fontSize: "12px",
    textAlign: "left",
    marginBottom: 12,
  },
  linkText: {
    color: "#fff",
    fontFamily: "Sora",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 12,
  },
}));

const FooterDesktop = ({ company, services, email, phone }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      // justifyItems="center"
      align="center"
    >
      <Grid item xs={12} sm={12}>
        <Typography variant="subtitle1">{company}</Typography>
        <Icon>
          <FacebookIcon />
        </Icon>
        <Icon>
          <LinkedInIcon />
        </Icon>
        <Icon>
          <TwitterIcon />
        </Icon>
        <Typography className={classes.linkText}>{email}</Typography>
      </Grid>
    </Grid>
  );
};

export default FooterDesktop;
