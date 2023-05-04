import * as React from "react";
import { useLocation } from "react-router-dom";

import MemberCard from "../components/MemberCardComp";

export default function MemberPage() {
  const location = useLocation();
  // (location.state.member);

  return (
    <div>
      <div style={{ textAlign: "center", margin: "auto" }}>
        <h1>Member</h1>
        <MemberCard member={location.state.member}   />
      </div>
    </div>
  );
}

// unfinished code
