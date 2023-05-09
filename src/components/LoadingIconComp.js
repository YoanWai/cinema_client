import * as React from "react";

import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <Oval
      height={115}
      width={115}
      color="rgba(29 , 48, 204, 0.5)"
      wrapperStyle={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#6897bb"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
