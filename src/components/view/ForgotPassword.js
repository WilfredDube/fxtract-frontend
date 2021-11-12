import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link as LinkR, Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { ForgotPasswordData } from "./formdata";

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
    // margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
});

export default function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const submit = async (data) => {
    const { email } = data;
    setEmail(email);
    await axios.post("/api/auth/get-password-reset-code", { email });

    setRedirect(true);
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/verify-email",
          state: { email, forgotPassword: true },
        }}
      />
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div style={{ margin: "30px" }}>
          <img
            src={process.env.PUBLIC_URL + "/logo-blue.svg"}
            alt="logo"
            width="80px"
          />
        </div>
        <Typography component="h1" variant="h5">
          Forgot my password
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder={ForgotPasswordData.label}
                name={ForgotPasswordData.name}
                type={ForgotPasswordData.type}
                {...register(ForgotPasswordData.name, { required: true })}
                helperText={errors[ForgotPasswordData.name]?.message}
                error={errors[ForgotPasswordData.name]?.message ? true : false}
              />
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                component={LinkR}
                to="/signin"
                style={{
                  textTransform: "none",
                }}
              >
                {"Back to login"}
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{
                  textTransform: "none",
                }}
              >
                {"Send reset code"}
              </Button>
            </Grid>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
