import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MemberCard from "../components/MemberCardComp";
import getFromDbToRedux from "../utils/getFromDbToRedux";

import { Button } from "@mui/material";

export default function MembersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const members = useSelector((state) => state.members);

  const addMember = () => {
    navigate("/addmember");
  };

  useEffect(() => {
    getFromDbToRedux({ dispatch });
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Subscriptions</h1>
      </div>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        {members
          ? members.map((member, index) => {
              return (
                <div
                  key={index}
                  style={{
                    height: "fit-content",
                    margin: "15px",
                    display: "inline-block",
                  }}
                >
                  <MemberCard member={member} />
                </div>
              );
            })
          : null}
      </div>
      <Button
        variant="outlined"
        color="primary"
        style={{
          margin: "auto",
          display: "block",
          marginBottom: "30px",
          width: "250px",
          fontSize: "20px",
        }}
        onClick={() => addMember()}
      >
        Add New Member
      </Button>
    </div>
  );
}
