import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContext from "./context/AuthContext";

ReactDOM.render(
  <AuthContext>
    <App />
  </AuthContext>,
  document.getElementById("root")
);
