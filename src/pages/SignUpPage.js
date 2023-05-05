import * as React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestRegistration } from "../utils/loginAndSignupUtil";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { myAlert, alertContainer } from "../utils/alertUtil";

const theme = createTheme();

export default function SignUpPage({ callback }) {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    country: "",
    city: "",
    phone: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // handle hiding navbar
  useEffect(() => {
    callback();
  }, [callback]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { success, data, response } = await requestRegistration(newUser);

    if (!success) {
      setErrorMessage(`* ${response.data.message}`);
      return;
    }
    if (success) {
      console.log(data);
      setErrorMessage("");
      myAlert("Registration successful!", "success");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const styles = {
    errorMessage: {
      color: "red",
      fontSize: "16px",
      marginTop: "10px",
      fontWeight: 400,
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", width: 90, height: 90 }}
            >
              <LiveTvIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="medium"
                    onChange={(event) => {
                      setNewUser({ ...newUser, firstname: event.target.value });
                    }}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={newUser.firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="medium"
                    onChange={(event) => {
                      setNewUser({ ...newUser, lastname: event.target.value });
                    }}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="medium"
                    onChange={(event) => {
                      setNewUser({ ...newUser, username: event.target.value });
                    }}
                    inputProps={{ minLength: 3 }}
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="medium"
                    onChange={(event) => {
                      setNewUser({ ...newUser, password: event.target.value });
                    }}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="medium"
                    onChange={(event) => {
                      setNewUser({ ...newUser, country: event.target.value });
                    }}
                    required
                    fullWidth
                    name="country"
                    label="Country"
                    type="country"
                    id="country"
                    autoComplete="new-country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="medium"
                    onChange={(event) => {
                      setNewUser({ ...newUser, city: event.target.value });
                    }}
                    required
                    fullWidth
                    name="city"
                    label="City"
                    type="city"
                    id="city"
                    autoComplete="new-city"
                  />
                </Grid>
              </Grid>
              <div style={styles.errorMessage}> {errorMessage}</div>

              <Button
                size="large"
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      {alertContainer()}
    </>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/mainmenu">
        Movies App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
