import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export default function MovieSearch(props) {
  const movies = useSelector((state) => state.movies).map((movie) => {
    return { label: movie.name, year: movie.year, id: movie._id };
  });

  const [value, setValue] = React.useState(null);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const movie = movies.find(
        (movie) => movie.label.toLowerCase() === e.target?.value.toLowerCase()
      );
      if (movie) {
        props.handleFoundMovie(movie);
        console.log(
          `found movie name: ${movie.label}, movie year: ${movie.year}`
        );
      } else {
        console.log("movie not found");
        alert("Movie not found");
        props.handleFoundMovie(null);
      }
    }
  };

  const handleSearchButton = () => {
    const movie = movies.find(
      (movie) => movie.label.toLowerCase() === value?.label.toLowerCase()
    );
    if (movie) {
      props.handleFoundMovie(movie);
      console.log(
        `found movie name: ${movie.label}, movie year: ${movie.year}`
      );
    } else {
      console.log("movie not found");
      alert("Movie not found");
      props.handleFoundMovie(null);
    }
  };

  const styles = {
    div: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div style={styles.div}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={movies}
        sx={{ width: 550 }}
        renderInput={(params) => (
          <TextField {...params} label="Search a Movie" />
        )}
        onChange={(e, value) => setValue(value)}
        onKeyPress={(e) => handleEnter(e)}
      />
      <Button
        variant="text"
        size="large"
        sx={{ ml: 2 }}
        onClick={(e) => handleSearchButton()}
      >
        Search
      </Button>
    </div>
  );
}
