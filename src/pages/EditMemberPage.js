import * as React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import fetcher from "../utils/fetchWithTokenUtil";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { myAlert, alertContainer } from "../utils/alertUtil";

export default function EditMemberPage() {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { member } = location.state;

  const [name, setName] = React.useState(member.name);
  const [email, setEmail] = React.useState(member.email);
  const [city, setCity] = React.useState(member.city);

  const updateMember = async () => {
    const updatedMember = {
      name: name,
      email: email,
      city: city,
      _id: member._id,
    };
    const response = await fetcher(
      `/members/${member._id}`,
      "PUT",
      updatedMember
    );
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: "UPDATE_MEMBER", payload: updatedMember });
      myAlert("Member updated successfully", "success");
      setTimeout(() => {
        navigate("/members");
      }, 1500);
    } else {
      console.log(`Error updating member: ${response.status}`);
      myAlert("Error updating member", "error");
    }
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
      backgroundColor: "white",
    },
    inputs: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      textAlign: "center",
    },

    membername: {
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.title}>Edit Member</div>
        <div style={styles.membername}>{member.name}</div>
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
              defaultValue={member.name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              defaultValue={member.city}
              onChange={(e) => setCity(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              defaultValue={member.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
        </div>
        <Button variant="contained" size="small" onClick={() => updateMember()}>
          Update
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
        {alertContainer()}
      </div>
    </>
  );
}
