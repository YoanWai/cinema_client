import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { myAlert, alertContainer } from "../utils/alertUtil";

import fetcher from "../utils/fetchWithTokenUtil";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function ViewButton(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ p: 2 }} {...other}>
      {children}'s Subscriptions
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 4,
            top: 4,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

ViewButton.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const AddSubscription = ({ member, callback }) => {
  const dispatch = useDispatch();

  const [newSubscription, setNewSubscription] = React.useState({
    movieId: "",
    memberId: member._id,
    date: "",
  });

  const movies = useSelector((state) => state.movies);

  const handleAddSubscription = async () => {
    if (newSubscription.movieId === "") {
      myAlert("Please select a movie", "error");
      return;
    } else if (newSubscription.date === "") {
      myAlert("Please select a date", "error");
      return;
    }

    const response = await fetcher("/subscriptions", "POST", newSubscription);

    if (response) {
      dispatch({ type: "ADD_SUBSCRIPTION", payload: newSubscription });
      myAlert("Subscription added successfully", "success");
      callback();
    } else {
      myAlert("Subscription failed to add", "error");
    }

    console.log("newSubscription:", newSubscription);
  };

  return (
    <span
      style={{
        marginTop: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",

        width: "100%",
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="label">Movie</InputLabel>
        <Select
          labelId="label"
          value={newSubscription.movieId}
          label="Age"
          sx={{ width: "200px" }}
        >
          {movies?.map((movie) => {
            return (
              <MenuItem
                key={movie._id}
                value={movie._id}
                onClick={() => {
                  setNewSubscription({
                    ...newSubscription,
                    movieId: movie._id,
                  });
                }}
              >
                {movie.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="DD-MM-YYYY"
          sx={{ width: "80%" }}
          label="Date"
          onChange={(newValue) => {
            setNewSubscription({
              ...newSubscription,
              date: dayjs(newValue).format("DD.MM.YYYY"),
            });
          }}
        />
      </LocalizationProvider>
      <span style={{ marginBottom: "15px" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleAddSubscription()}
          size="small"
        >
          Confirm
        </Button>{" "}
        <Button
          variant="outlined"
          color="error"
          onClick={() => callback()}
          size="small"
        >
          Cancel
        </Button>
      </span>
      {alertContainer()}
    </span>
  );
};

export default function ViewSubscriptionsButton({ member }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(false);

  const handleClickOpen = () => {
    setFlag(false);
    setOpen(true);
  };
  const handleClose = () => {
    setFlag(false);
    setOpen(false);
  };

  const callback = () => {
    setFlag(false);
  };

  const subscriptions = useSelector((state) => state.subscriptions);
  const movies = useSelector((state) => state.movies);

  const memberSubscriptions = subscriptions.filter(
    (subscription) => subscription.memberId === member._id
  );

  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        MOVIES Watched
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <ViewButton
          id="customized-dialog-title"
          onClose={handleClose}
          children={member.name}
        ></ViewButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            {memberSubscriptions.map((subscription) => {
              return (
                <span key={subscription._id}>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "purple",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/allmovies", {
                        state: {
                          movie: movies.find(
                            (movie) => movie._id === subscription.movieId
                          ),
                        },
                      });
                    }}
                  >
                    {
                      movies.find((movie) => movie._id === subscription.movieId)
                        .name
                    }
                  </span>

                  {" - "}
                  {subscription.date}
                  <br />
                </span>
              );
            })}
          </Typography>
        </DialogContent>
        <DialogActions style={{ margin: "auto" }}>
          <Button onClick={() => setFlag(!flag)}> Add Subscription </Button>
          <Button autoFocus onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
        {flag ? <AddSubscription member={member} callback={callback} /> : null}
      </BootstrapDialog>
    </div>
  );
}
