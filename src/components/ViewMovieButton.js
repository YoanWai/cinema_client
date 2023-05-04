import * as React from "react";

import { useSelector } from "react-redux";
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
      {children} Subscriptions
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

export default function ViewMovieButton({ movie }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const members = useSelector((state) => state.members);
  const subscriptions = useSelector((state) => state.subscriptions);

  return (
    <div>
      <Button size="small" variant="text" onClick={handleClickOpen}>
        VIEW
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <ViewButton
          id="customized-dialog-title"
          onClose={handleClose}
          children={movie.name}
        ></ViewButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            {members
              ? subscriptions.map((sub, index) => {
                  if (sub.movieId === movie._id) {
                    return (
                      <span key={index}>
                        <span
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={() =>
                            navigate("/member", {
                              state: {
                                member: members.find(
                                  (m) => m._id === sub.memberId
                                ),
                              },
                            })
                          }
                        >
                          {members.find((m) => m._id === sub.memberId)?.name}
                        </span>
                        {" - "}
                        {sub.date}
                        <br />
                      </span>
                    );
                  } else {
                    return null;
                  }
                })
              : null}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
