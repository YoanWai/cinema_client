import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MovieSearchComp from "../components/MovieSearchComp";
import MovieCardComp from "../components/MovieCardComp";
import getFromDbToRedux from "../utils/getFromDbToRedux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

const theme = createTheme();

export default function AllMoviesPage({ callback }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const movies = useSelector((state) => state.movies);

  const [shownMovies, setShownMovies] = React.useState([...movies]);

  const foundMovie = (movie) => {
    if (movie) {
      console.log(`found movie: ${movie.label}`);
      setShownMovies([...movies.filter((m) => m.name === movie.label)]);
    } else {
      setShownMovies([...movies]);
    }
  };

  React.useEffect(() => {
    callback();
  }, []);

  React.useEffect(() => {
    getFromDbToRedux({ dispatch });
  }, []);

  React.useEffect(() => {
    setShownMovies([...movies]);
    if (location.state?.movie) {
      setShownMovies([location.state.movie]);
    }
  }, [movies]);

  return (
    <ThemeProvider theme={theme}>
      <main style={{ textAlign: "center" }}>
        <Box
          sx={{
            bgcolor: "transparent",
            pt: 4,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Movies
            </Typography>

            <div
              style={{
                textAlign: "center",
                alignSelf: "center",
                marginBottom: "20px",
              }}
            >
              <MovieSearchComp handleFoundMovie={foundMovie} />
            </div>
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container columns={12} spacing={4}>
            {shownMovies.map((movie) => (
              <MovieCardComp key={movie._id} movie={movie} />
            ))}
          </Grid>
        </Container>
        <Button
          style={{
            width: "300px",
            marginBottom: "40px",
            marginTop: "20px",
            alignSelf: "center",
            fontSize: "25px",
          }}
          variant="outlined"
          onClick={() => navigate("/addmovie")}
        >
          Add Movie
        </Button>
      </main>
    </ThemeProvider>
  );
}
