import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ArrowForward } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    // backgroundColor: "#3f51b5ff",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(12, 0, 12),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

// const cards = [1, 2, 3];

const WhiteTextTypography = withStyles({
  root: {
    // color: "#FFFFFF",
  },
})(Typography);

export default function Hero() {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={5}>
              <WhiteTextTypography
                component="h1"
                variant="h2"
                // align="center"
                color="textPrimary"
                gutterBottom
              >
                Power up your manufacturing
              </WhiteTextTypography>
              <WhiteTextTypography
                variant="h5"
                // align="center"
                color="textSecondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </WhiteTextTypography>
              <div className={classes.heroButtons}>
                {/* <Grid container spacing={2} justifyContent="center"> */}
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{
                        // textTransform: "none",
                        // fontWeight: "bold",
                        // fontSize: 17,
                        width: 190,
                        height: 50,
                      }}
                      component={Link}
                      to={"/fxt/signup"}
                    >
                      Get started <ArrowForward />
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
            <Grid item xs={12} sm={6}>
              <img
                src={process.env.PUBLIC_URL + "/3d_viewer.svg"}
                alt="logo"
                width={"100%"}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
