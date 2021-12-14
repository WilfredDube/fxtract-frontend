import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link as LinkR, Redirect, useLocation } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { passwordResetData } from "./formdata";

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
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must contain alphabetic characters (both lowercase and uppercase)"
    )
    .matches(/^(?=.*[0-9])/, "Must contain numerals")
    .matches(
      /[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/,
      "Must contain special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function ResetPassword() {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const submit = async (data) => {
    await axios
      .post("/api/auth/reset-password", {
        email: location.state.email,
        code: location.state.code,
        password: data.password,
        password_confirm: data.confirmPassword,
      })
      .then((response) => {
        if (response.data.status === true) {
          setRedirect(true);
          return true;
        } else {
          setRedirect(false);
          return false;
        }
      });
  };

  if (redirect) {
    return <Redirect to="/signin" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset your password
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <Grid container spacing={2}>
            {passwordResetData.map((input, key) => (
              <Grid item xs={12} key={key}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  placeholder={input.label}
                  name={input.name}
                  type={input.type}
                  {...register(input.name, { required: true })}
                  helperText={errors[input.name]?.message}
                  error={errors[input.name]?.message ? true : false}
                />
              </Grid>
            ))}
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
                {"Reset password"}
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
