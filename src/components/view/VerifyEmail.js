import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Link as LinkR } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  },
}));

export default function VerifyEmail() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Please verify your email address
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              paragraph
            >
              Great! You're almost there. Before you can create a project,
              you'll need to verify your email address. We've sent a
              verification email to
              <br />
            </Typography>
            <Typography align="center" style={{ fontWeight: "bolder" }}>
              youremail@domain.com
            </Typography>
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="code"
                      label="Verification code"
                      type="code"
                      id="code"
                      autoComplete="current-code"
                    />
                  </Grid>
                  <Grid item xs></Grid>
                  <Grid item xs>
                    <Button
                      // type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      component={LinkR}
                      to="/projects"
                      style={{
                        textTransform: "none",
                      }}
                    >
                      Activate
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
