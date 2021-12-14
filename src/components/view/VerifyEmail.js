import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { verificationData } from "./formdata";

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

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Verification code is required")
    .min(8, "Verification code is invalid")
    .max(8, "Verification code is invalid"),
});

export default function VerifyEmail({ props }) {
  const classes = useStyles();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [email] = useState(location.state.email);
  const [url, setUrl] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [title, setTitle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (location.state.forgotPassword) {
      setUrl("/api/auth/verify-password-reset-code");
      setTitle("Enter the reset code");
      setSubTitle("Enter the verification code that we sent to your email:");
    } else {
      setUrl("/api/auth/verify");
      setTitle("Please verify your email address");
      setSubTitle(
        "Great! You're almost there. Before you can create a project, you'll need to verify your email address. We've sent a verification email to"
      );
    }
  }, [url, subTitle, title, location.state.forgotPassword]);

  const submit = async (data) => {
    setVerificationCode(data.code);

    await axios
      .post(url, {
        email,
        code: data.code,
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
    if (location.state.forgotPassword) {
      return (
        <Redirect
          to={{
            pathname: "/fxt/reset-password",
            state: { email, code: verificationCode },
          }}
        />
      );
    } else return <Redirect to="/fxt/" />;
  } else
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
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
                {title}
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="textSecondary"
                paragraph
              >
                {subTitle}
                <br />
              </Typography>
              <Typography align="center" style={{ fontWeight: "bolder" }}>
                {email}
              </Typography>
              <CssBaseline />
              <div className={classes.paper}>
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
                        placeholder={verificationData.label}
                        name={verificationData.name}
                        type={verificationData.type}
                        {...register(verificationData.name, {
                          required: true,
                        })}
                        helperText={errors[verificationData.name]?.message}
                        error={
                          errors[verificationData.name]?.message ? true : false
                        }
                      />
                    </Grid>
                    <Grid item xs></Grid>
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
                        Verify
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
