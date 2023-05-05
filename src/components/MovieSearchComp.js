import * as React from "react";

import { useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        console.log("Movie not found");
        toast.error("Movie not found", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
      toast.error("Movie not found", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
