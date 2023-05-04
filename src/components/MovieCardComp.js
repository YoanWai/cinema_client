import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ViewMovieButton from "../components/ViewMovieButton";
import fetcher from "../utils/fetchWithTokenUtil";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteMovie = async () => {
    await fetcher(`/movies/${movie._id}`, "DELETE");
    dispatch({ type: "DELETE_MOVIE", payload: movie });
  };

  return (
    <Grid item key={movie} xs={12} sm={6} md={4}>
      <Card
        style={{
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "1px 1px 5px rgba(32, 32, 33, 0.5)",
        }}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{
            width: "275px",
            height: "450px",
            alignSelf: "center",
          }}
          component="img"
          image={movie.image}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            <span style={{ fontWeight: "bolder", fontSize: "22px" }}>
              {movie.name}{" "}
            </span>
            <span>{movie.year}</span>
          </Typography>
          <div style={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "12px" }}>
              <span style={{ fontWeight: "bold" }}>Genres: </span>
              {movie.genres?.map((genre, index) => (
                <span key={index}>{genre}, </span>
              ))}
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              <span style={{ fontWeight: "bold" }}>Rating:</span> {movie.rating}
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              <span style={{ fontWeight: "bold" }}>Description:</span> <br />
              {movie.description}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <ViewMovieButton movie={movie}></ViewMovieButton>
          <Button
            size="small"
            onClick={() => navigate(`/editmovie`, { state: { movie } })}
          >
            EDIT
          </Button>
          <Button size="small" onClick={() => deleteMovie(movie)}>
            DELETE
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
