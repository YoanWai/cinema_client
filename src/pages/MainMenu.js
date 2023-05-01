import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainMenu({ callback }) {
  const navigate = useNavigate();

  // handle showing navbar
  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <div>
      <div style={{ fontSize: "50px", fontWeight: 300, margin: "25px" }}>
        Main Menu
      </div>
      <div style={styles.buttonsContainer}>
        <Button
          style={styles.buttons}
          variant="outlined"
          onClick={() => navigate("/allmovies")}
        >
          All Movies
        </Button>
        <Button
          style={styles.buttons}
          variant="outlined"
          onClick={() => navigate("/addmovie")}
        >
          Add Movie
        </Button>
      </div>
    </div>
  );
}

const styles = {
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttons: {
    width: "20%",
    height: "35%",
    margin: "10px",
    padding: "32px",
    border: "2px solid #0D47A1",
    borderRadius: "20px",
    fontSize: "28px",
    alignSelf: "center",
  },
};
