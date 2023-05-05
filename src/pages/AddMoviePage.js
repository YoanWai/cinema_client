import * as React from "react";

import { useNavigate } from "react-router-dom";

import fetcher from "../utils/fetchWithTokenUtil";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import { myAlert, alertContainer } from "../utils/alertUtil";

export default function AddMoviePage() {
  const navigate = useNavigate();

  const [newMovie, setNewMovie] = React.useState({
    name: "",
    year: 0,
    rating: 0,
    genres: [],
    image: "",
    description: "",
  });

  const [newGenre, setNewGenre] = React.useState("");

  const addMovie = async () => {
    const response = await fetcher("/movies", "POST", newMovie);

    if (response.status === 200) {
      myAlert("Movie added successfully", "success");
      setTimeout(() => {
        navigate("/allmovies");
      }, 1500);
    } else {
      myAlert("Error adding movie", "error");
      console.log(response);
    }
  };

  const deleteGenre = (genre) => {
    setNewMovie({
      ...newMovie,
      genres: newMovie.genres.filter((g) => g !== genre),
    });
  };

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
      marginBottom: "20px",
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

  return (
    <>
      <div style={styles.container}>
        <div style={styles.title}>Add New Movie</div>
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
              onChange={(e) => {
                setNewMovie({
                  ...newMovie,
                  name: e.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Year"
              type="number"
              variant="outlined"
              onChange={(e) => {
                setNewMovie({
                  ...newMovie,
                  year: e.target.value,
                });
              }}
            />

            <TextField
              id="outlined-basic"
              label="Image Source"
              variant="outlined"
              onChange={(e) => {
                setNewMovie({
                  ...newMovie,
                  image: e.target.value,
                });
              }}
            />
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
              />
              <Button
                style={styles.addbutton}
                color="success"
                size="small"
                onClick={() =>
                  setNewMovie({
                    ...newMovie,
                    genres: [...newMovie.genres, newGenre],
                  })
                }
              >
                <AddIcon />
              </Button>
            </div>
            <div>
              Genres:{" "}
              {newMovie.genres?.map((genre, index) => (
                <span key={index} onClick={() => deleteGenre(genre)}>
                  {genre},
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
              onChange={(e) => {
                setNewMovie({ ...newMovie, description: e.target.value });
              }}
            />
          </div>

          <div style={styles.ratingheader}>Rating:</div>
          <Stack spacing={1} sx={{ mb: 4 }}>
            <Rating
              name="simple-controlled"
              precision={0.5}
              onChange={(e) => {
                setNewMovie({
                  ...newMovie,
                  rating: e.target.value,
                });
              }}
            />
          </Stack>
        </div>
        <Button variant="contained" size="small" onClick={() => addMovie()}>
          Add Movie
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
