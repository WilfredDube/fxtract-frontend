import {
  Button,
  Container,
  createMuiTheme,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    [theme.breakpoints.up("sm")]: {
      paddingTop: "10%",
      paddingBottom: "10%",
    },
  },
  product: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 3),
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#ececec",
      padding: theme.spacing(2, 0, 6),
    },
  },
  productTitle: {
    color: "#4d4d4dff",
    fontSize: "14px",
    lineHeight: "16px",
    fontWeight: "bold",
    letterSpacing: "1.4px",
    textTransform: "uppercase",
    marginBottom: "16px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "16px",
      letterSpacing: "1.4px",
      lineHeight: "18px",
    },
  },
  learnMoreBtn: {
    backgroundColor: "#3a8de5ff",
    color: "white",
  },
  sectionMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const theme = createMuiTheme();
theme.typography.h4 = {
  color: "#4d4d4dff",
  fontSize: 36,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 28,
  },
};

theme.typography.h6 = {
  color: "#4d4d4dff",
  fontSize: 20,
  [theme.breakpoints.down("sm")]: {
    fontSize: 18,
  },
};

const ProductBannerLeft = (props) => {
  const classes = useStyles();
  const image = require(`../../assets/${props.image}`);

  return (
    <>
      <div className={classes.product}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={5}>
            <Container maxWidth="sm" className={classes.container}>
              <div>
                <Typography
                  className={classes.productTitle}
                  variant="h5"
                  gutterBottom
                >
                  {props.title}
                </Typography>
              </div>
              <Typography
                variant="h6"
                align="left"
                color="textSecondary"
                paragraph
              >
                {props.summary}
              </Typography>
              {props.showBtn === true && (
                <Button
                  variant="contained"
                  className={classes.learnMoreBtn}
                  component={Link}
                  to={props.link}
                >
                  Learn more
                </Button>
              )}
            </Container>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Hidden smDown implementation="js">
              <img src={image.default} alt="Hero" width="50%" align="left" />
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={5} align="center">
            <Hidden mdUp implementation="js">
              <img
                src={image.default}
                alt="Hero"
                width="100%"
                align="center"
              ></img>
            </Hidden>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProductBannerLeft;
