import React from "react";
// import footerBg from "../../assets/footer_bg_img.svg";
import { makeStyles } from "@material-ui/core/styles";

import { Hidden, Typography } from "@material-ui/core";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";
import { footerData } from "./Data";

const useStyles = makeStyles((theme) => ({
  footer: {
    flexGrow: 1,
    backgroundColor: "#052c4dff",
    // backgroundImage: `url(${footerBg})`,
    color: "#fff",
    padding: theme.spacing(12, 12, 12),
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(8, 2, 8),
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer>
      <div className={classes.footer}>
        <Hidden smDown implementation="js">
          <FooterDesktop {...footerData} />
        </Hidden>
        <Hidden mdUp implementation="js">
          <FooterMobile {...footerData} />
        </Hidden>
      </div>
      <div
        align="center"
        style={{
          background: "#05264dff",
          opacity: "100%",
          color: "#fff",
          padding: "20px",
          fontFamily: "Sora",
        }}
      >
        <Typography>
          &copy; Fxtract {1900 + new Date().getYear()} All rights reserved
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
