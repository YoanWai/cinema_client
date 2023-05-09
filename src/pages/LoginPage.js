import * as React from "react";

import { requestLogin } from "../utils/loginAndSignupUtil";
import CostumeSnackbar from "../components/AlertComp";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Link from "@mui/material/Link";

import Loader from "../components/LoadingIconComp";

const theme = createTheme();

export default function LoginPage({ callback }) {
  const [loading, setLoading] = React.useState(false);

  // handle hiding navbar
  useEffect(() => {
    callback();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = React.useState("");
  const [showError, setShowError] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const inputs = new FormData(event.currentTarget);
    const payload = {
      username: inputs.get("username"),
      password: inputs.get("password"),
    };

    const response = await requestLogin(payload.username, payload.password);
    console.log(response);

    if (response.code === "ERR_NETWORK") {
      setLoading(false);
      setError("Network error. Please try again later.");
      setShowError(true);

      return;
    }

    if (response.code === "ERR_BAD_REQUEST") {
      setLoading(false);
      console.log(`Error: ${response.response.data.message}`);
      setError(response.response.data.message);
      setShowError(true);
      return;
    }

    if (response?.response?.status === 403) {
      setLoading(false);
      setError(response.response.data.message);
      setShowError(true);
      return;
    }

    if (response.success) {
      setLoading(false);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({ type: "LOGIN_USER", payload: response.data.user });
      console.log(response.data);
      navigate("/allmovies");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? <Loader /> : null}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 6,
              mx: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 2, bgcolor: "secondary.main", width: 90, height: 90 }}
            >
              <LiveTvIcon sx={{ fontSize: 50 }} />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <br></br>

              <Button
                size="large"
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              {showError ? <CostumeSnackbar message={error} /> : null}
            </Box>
          </Box>
          <Copyright />
        </Grid>
      </Grid>
    </ThemeProvider>
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
      <Link color="inherit" href="/allmovies">
        Movies App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
