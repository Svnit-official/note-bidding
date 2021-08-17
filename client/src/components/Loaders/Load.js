import loading from "./loading2.gif";
import React from "react";

const Load = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={loading} alt="load"></img>
    </div>
  );
};

export default Load;
