import * as React from "react";
import { useLocation } from "react-router-dom";

export default function MemberPage() {
  const location = useLocation();
  // (location.state.member);

  return (
    <div>
      <h1>{location.state.member.name}</h1>
      <h2>Page in production</h2>
    </div>
  );
}

// unfinished code
