import * as React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import fetcher from "../utils/fetchWithTokenUtil";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { myAlert, alertContainer } from "../utils/alertUtil";

export default function AddMemberPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [member, setMembers] = React.useState({});

  const addMember = async () => {
    const response = await fetcher("/members", "post", member);
    if (response.status === 200) {
      myAlert("Member added successfully", "success");
      dispatch({ type: "ADD_MEMBER", payload: member });
      navigate("/members");
    } else {
      myAlert("Error adding member", "error");
      console.log(`Error adding member: ${response.status}`);
    }
  };

  const styles = {
    container: {
      border: "1px solid rgba(0, 0, 0, 0.24)",
      width: "20%",
      margin: "auto",
      backgroundColor: "white",
      marginTop: "80px",
      marginBottom: "80px",
      padding: "40px",
      borderRadius: "10px",
      textAlign: "center",
    },
    inputs: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.title}>Add New Member</div>
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
                setMembers({ ...member, name: e.target.value });
              }}
            />

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setMembers({ ...member, email: e.target.value });
              }}
            />

            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              onChange={(e) => {
                setMembers({ ...member, city: e.target.value });
              }}
            />
          </Box>
        </div>
        <Button variant="contained" size="small" onClick={() => addMember()}>
          Add Member
        </Button>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={() => navigate("/members")}
          sx={{ marginLeft: "20px" }}
        >
          Cancel
        </Button>
      </div>
      {alertContainer()}
    </>
  );
}
