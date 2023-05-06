import * as React from "react";

import fetcher from "../utils/fetchWithTokenUtil";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import { myAlert, alertContainer } from "../utils/alertUtil";

export default function EditMoviePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { movie } = location.state;

  const [editedMovie, setEditedMovie] = React.useState({ ...movie });

  const [ratingValue, setRatingValue] = React.useState(+editedMovie.rating);

  const [newGenre, setNewGenre] = React.useState("");

  const styles = {
    container: {
      border: "1px solid rgba(0, 0, 0, 0.24)",
      width: "30%",
      margin: "auto",
      marginTop: "30px",
      marginBottom: "30px",
      padding: "30px",
      borderRadius: "10px",
      textAlign: "center",
      backgroundColor: "white",
    },
    inputs: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    genres: {
      border: "1px solid rgba(0, 0, 0, 0.24)",
      borderRadius: "5px",
      padding: "10px",
      margin: "auto",
      width: "194px",
    },
    genresinputs: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      textAlign: "center",
    },

    moviename: {
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
    ratingheader: {
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "10px",
      marginTop: "20px",
    },
    description: {
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  async function updateMovie() {
    const response = await fetcher("/movies/" + movie._id, "PUT", editedMovie);
    if (response.status === 200) {
      myAlert("Movie updated successfully", "success");
      setTimeout(() => {
        navigate("/allmovies");
      }, 1000);
    }
  }

  const deleteGenre = (genre) => {
    setEditedMovie({
      ...editedMovie,
      genres: editedMovie.genres.filter((g) => g !== genre),
    });
  };

  const handleAddGenre = () => {
    if (newGenre === "") {
      myAlert("Please enter a genre", "error");
      return;
    }
    if (editedMovie.genres.includes(newGenre)) {
      myAlert("Genre already exists", "error");
      return;
    }
    setEditedMovie({
      ...editedMovie,
      genres: [...editedMovie.genres, newGenre],
    });
    setNewGenre("");
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.title}>Edit Movie</div>
        <div style={styles.moviename}>{editedMovie.name}</div>
        <div style={styles.inputs}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "25ch",
                display: "block",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              defaultValue={editedMovie.name}
              onChange={(e) => {
                setEditedMovie({ ...editedMovie, name: e.target.value });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Year"
              type="number"
              variant="outlined"
              defaultValue={editedMovie.year}
              onChange={(e) => {
                setEditedMovie({ ...editedMovie, year: e.target.value });
              }}
            />

            <TextField
              id="outlined-basic"
              label="Image Source"
              variant="outlined"
              defaultValue={editedMovie.image}
              onChange={(e) => {
                setEditedMovie({ ...editedMovie, image: e.target.value });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              defaultValue={editedMovie.description}
              onChange={(e) => {
                setEditedMovie({ ...editedMovie, description: e.target.value });
              }}
            ></TextField>
          </Box>

          <div style={styles.genres}>
            <div style={styles.genresinputs}>
              <TextField
                size="small"
                id="outlined-basic"
                label="Genre"
                variant="outlined"
                onChange={(e) => {
                  setNewGenre(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddGenre(newGenre);
                  }
                }}
                value={newGenre}
              />
              <Button
                style={styles.addbutton}
                color="success"
                size="small"
                onClick={() => handleAddGenre(newGenre)}
              >
                <AddIcon />
              </Button>
            </div>
            <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              Genres:{" "}
              {editedMovie.genres?.map((genre, index) => (
                <span
                  title={genre}
                  key={index}
                  onClick={() => deleteGenre(genre)}
                >
                  {genre},{" "}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.description}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              style={{
                borderRadius: "10px",
                resize: "none",
                border: " 1px solid rgba(0,0,0,0.24) ",
                fontFamily: "Ariel",
              }}
              rows="6"
              cols="26"
              defaultValue={editedMovie.description}
              onChange={(e) => {
                setEditedMovie({ ...editedMovie, description: e.target.value });
              }}
            />
          </div>

          <div style={styles.ratingheader}>Rating:</div>
          <Stack spacing={1} sx={{ mb: 4 }}>
            <Rating
              name="simple-controlled"
              value={ratingValue}
              precision={0.5}
              onChange={(e) => {
                setRatingValue(+e.target.value);
                setEditedMovie({ ...editedMovie, rating: e.target.value });
              }}
            />
          </Stack>
        </div>
        <Button variant="contained" size="small" onClick={() => updateMovie()}>
          Update
        </Button>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={() => navigate("/allmovies")}
          sx={{ marginLeft: "20px" }}
        >
          Cancel
        </Button>
      </div>
      {alertContainer()}
    </>
  );
}
