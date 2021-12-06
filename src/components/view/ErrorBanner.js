import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Close } from "@material-ui/icons";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    border: 1,
    borderColor: red[500],
    borderRadius: "6px",
    borderStyle: "solid",
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    // backgroundColor: red[500],
    color: red[500],
    fontSize: "13px",
  },
}));

function ErrorBanner({ message, close, refresh }) {
  const classes = useStyles();

  return (
    <div className={classes.error}>
      <Grid container alignItems="center">
        <Grid item xs>
          {message}
        </Grid>
        <Grid item>
          {refresh === true ? (
            <AutorenewIcon onClick={() => close()} />
          ) : (
            <Close
              size="small"
              style={{ verticalAlign: "text-bottom" }}
              onClick={() => close()}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ErrorBanner;
