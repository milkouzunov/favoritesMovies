/* eslint-disable no-throw-literal */

import { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Error from "../Error";

import { signupRequest } from "../../appRedux/actions/AuthActions";

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

export default function SignUp({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.pass.value;
    const rePassword = e.target.rePassword.value;

    if (username.length < 6) {
      return setError("Username too short! Minimum 6 characters");
    } else if (password.length < 6) {
      return setError("Password too short! Minimum 6 characters");
    } else if (password !== rePassword) {
      return setError("Passwords don't match!");
    } else {
      setError("");
    }
    dispatch(signupRequest({ username, password, rePassword }));
    history.push("/sign-in");
  };

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
        <form onSubmit={handleOnSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pass"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                style={{
                  marginTop: 16,
                }}
                variant="outlined"
                required
                fullWidth
                name="rePassword"
                label="Repeat Password"
                type="password"
                id="re-password"
                autoComplete="current-password"
              />
            </Grid>
            <Error>{error}</Error>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
