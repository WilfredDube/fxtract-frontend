import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import ProductHeader from "./ProductHeader";
import Hero from "./Hero";
import ProcessStep from "./ProcessStep";
import { processData } from "./HeroData";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Link as LINK } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ececec",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "12%",
      paddingRight: "12%",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0%",
      paddingRight: "0%",
    },
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    height: 500,
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(12, 0, 12),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  process: {
    padding: theme.spacing(0, 0, 10),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ececec",
    // backgroundColor: theme.palette.background.default,
  },
  cardMedia: {
    paddingTop: "100%", // 16:9
    backgroundSize: "contain",
    width: "40%",
    paddingLeft: "12%",
    paddingRight: "12%",
  },
  cardContent: {
    flexGrow: 1,
  },
  alignItemsAndJustifyContent: {
    width: 500,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// const cards = [1, 2, 3];

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main className={classes.root}>
        {/* Hero unit */}
        <Hero />
        <ProductHeader />
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Container xs={12} sm={12} md={12} className={classes.process}>
            <Typography align="center" variant="h4" gutterBottom>
              {"How Fxtract works"}
            </Typography>
            <Typography align="center" variant="h6" gutterBottom>
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
            </Typography>
          </Container>
          <Grid container spacing={6} className={classes.process}>
            {processData.map((step) => (
              <Grid item xs={12} sm={6} md={4}>
                <ProcessStep
                  image={step.image}
                  header={step.header}
                  summary={step.summary}
                />
              </Grid>
            ))}
          </Grid>
          <div>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{
                    width: 190,
                    height: 50,
                  }}
                  component={LINK}
                  to={"/learn"}
                >
                  Learn more
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}
