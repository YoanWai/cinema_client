import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ViewSubscriptionsButton from "./ViewSubscribedMoviesComp";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import fetcher from "../utils/fetchWithTokenUtil";

export default function MemberCard({ member }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberSubscriptions = useSelector((state) =>
    state.subscriptions.filter((sub) => sub.memberId === member._id)
  );

  const deleteMember = async () => {
    const response = await fetcher(`/members/${member._id}`, "DELETE");
    if (response) {
      dispatch({ type: "DELETE_MEMBER", payload: member });
      alert("Member deleted successfully");
      navigate("/members");
    } else {
      alert("Error deleting member");
    }

    memberSubscriptions.forEach(async (sub) => {
      const response = await fetcher(`/subscriptions/${sub._id}`, "DELETE");
      if (response) {
        dispatch({ type: "DELETE_SUBSCRIPTION", payload: sub });
        console.log(`deleted subscription: ${JSON.stringify(sub)}`);
      } else {
        console.log(`error deleting subscription: ${JSON.stringify(sub)}`);
      }
    });
  };

  return (
    <Card
      sx={{
        width: 270,
        height: 250,
        margin: "10px",
        padding: "10px",
      }}
      style={{ boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.3)" }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Name: {member.name}
        </Typography>{" "}
        <br />
        <Typography variant="h7" component="div">
          Email: {member.email}
        </Typography>
        <Typography variant="h7" component="div">
          City: {member.city}
        </Typography>{" "}
        <br />
        <Button
          size="small"
          onClick={() => {
            navigate(`/editmember`, {
              state: { member: member },
            });
          }}
        >
          Edit
        </Button>
        <Button size="small" onClick={() => deleteMember()}>
          Delete
        </Button>
      </CardContent>
      <CardActions>
        <ViewSubscriptionsButton member={member} />
      </CardActions>
    </Card>
  );
}
