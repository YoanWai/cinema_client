import { Box, Typography } from "@mui/material";
import { Link } from "@mui/material";

const Footer = () => {
  function Copyright() {
    return (
      <Typography
        sx={{ fontSize: "10px" }}
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {"Copyright © "}
        <Link color="inherit" href="/allmovies">
          Cinema
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <Box
      style={{ textAlign: "center" }}
      sx={{ bgcolor: "lightgrey", p: 3 }}
      component="footer"
    >
      <Typography
        sx={{ fontSize: "18px" }}
        variant="p"
        align="center"
        gutterBottom
      >
        Cinema
      </Typography>
      <Typography
        sx={{ fontSize: "12px" }}
        variant="p"
        align="center"
        color="text.secondary"
        component="p"
      >
        BoostApp 2023 final project
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
