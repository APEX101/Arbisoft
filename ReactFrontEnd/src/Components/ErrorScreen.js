import React from "react";
import Typography from "@material-ui/core/Typography";

const ErrorScreen = ({ errormsg }) => {
  return (
    <div style={{ backgroundColor: "red" }}>
      <Typography style={{ textAlign: "center" }}>{errormsg}</Typography>
    </div>
  );
};

export default ErrorScreen;
