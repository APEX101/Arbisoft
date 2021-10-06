import React, { useState } from "react";
import axiosInstance from "../axios";
import { NavLink, useHistory } from "react-router-dom";
// MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FlashMessage from "./FlashMessage";

import face from "../Images/face.png";

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const InitialFormData = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  };

  const [formData, setFormData] = useState(InitialFormData);
  const [error, setError] = useState([]);
  const [response, setResponse] = useState([]);

  const handleChange = (event) => {
    setFormData({
      //   only appending values not replacing existing ie username,mail etc
      ...formData,
      // to trim white space
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .post("auth/register/", {
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setResponse(res.data);
        // redirecting using usehistory push method
        const timer = setTimeout(() => {
          history.push("/Login");
        }, 1000);

        return () => clearTimeout(timer);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {response ? (
          <FlashMessage successmsg={response.Account}></FlashMessage>
        ) : (
          ""
        )}
        <Avatar src={face}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username "
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
              {error.username ? (
                <p style={{ color: "red" }}>{error.username}</p>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                // value={InitialFormData.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                onChange={handleChange}
                // value={InitialFormData.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                // value={InitialFormData.email}
              />
              {error.email ? <p style={{ color: "red" }}>{error.email}</p> : ""}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                // value={InitialFormData.password}
              />
              {error.password ? (
                <p style={{ color: "red" }}>{error.password}</p>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive notifications and  updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" component={NavLink} to="/Login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
