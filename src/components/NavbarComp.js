import * as React from "react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const pages = [
  { name: "Movies", path: "allmovies" },
  { name: "Members", path: "members" },
];

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: "#3d6bb3",
      main: "#0d47a1",
      dark: "#093170",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const logout = () => {
  sessionStorage.clear();
  window.location.href = "/";
};

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const styles = {
    fullname: {
      marginRight: "10px",
      color: "white",
      fontSize: "1.2rem",
      fontWeight: 300,
    },
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <CameraOutdoorIcon
              sx={{ display: { xs: "none", md: "flex", fontSize: 40 }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => navigate("/allmovies")}
              style={{ cursor: "pointer" }}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Cinema
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate(page.path)}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <CameraOutdoorIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1, fontSize: 40 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => navigate("/allmovies")}
              style={{ cursor: "pointer" }}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Cinema
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <span style={styles.fullname}>{user?.fullname}</span>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.fullname?.slice(0, 1)}
                    src={`http://localhost:5000/images/${user?._id}`}
                    style={{ width: "35px", height: "35px" }}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "35px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate("/account")}
                  >
                    Account
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => logout()}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
