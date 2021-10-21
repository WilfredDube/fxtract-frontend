import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { signUpData } from "./formdata";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("Password is required"),
  lastname: Yup.string().required("Password is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
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
    .required("Password confirmation is required"),
});

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const submit = async (data) => {
    setEmail(data.email);

    await axios
      .post("/api/auth/register", {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
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
    return (
      <Redirect
        to={{
          pathname: "/verify-email",
          state: { email, forgotPassword: false },
        }}
      />
    );
  } else
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(submit)}
          >
            <Grid container spacing={2}>
              {signUpData.map((input, key) => (
                <Grid item xs={12} sm={input.width} key={key}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!isValid}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
}
