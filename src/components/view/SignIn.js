import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AuthContext } from "../../contexts/AuthContext";
import { SignInData } from "./formdata";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { red } from "@material-ui/core/colors";
import ErrorBanner from "./ErrorBanner";
import { CircularProgress } from "@material-ui/core";

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

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string().required("Password is required"),
});

export default function SignIn() {
  const classes = useStyles();
  const {
    isAuthenticated,
    userRole,
    authenticate,
    authErr,
    setAuthErr,
    loading,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const submit = async (data) => {
    const { email, password } = data;

    await authenticate({ email, password });
  };

  if (isAuthenticated) {
    if (userRole === 0) return <Redirect to="/projects" />;
    else return <div>admin</div>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}> */}
        <div style={{ margin: "50px" }}>
          <img
            src={process.env.PUBLIC_URL + "/logo-blue.svg"}
            alt="logo"
            width="80px"
          />
        </div>
        {/* </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          {authErr && (
            <ErrorBanner message={authErr} close={() => setAuthErr(null)} />
          )}
          {SignInData.map((input, key) => (
            <TextField
              key={key}
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
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? (
              <CircularProgress
                style={{
                  width: "30px",
                  height: "30px",
                  color: "white",
                }}
              />
            ) : (
              "Sign In"
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
