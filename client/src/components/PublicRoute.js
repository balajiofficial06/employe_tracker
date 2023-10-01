import { Navigate } from "react-router-dom";
import React from "react";

function PublicRoute(props) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    console.log(props.children);
    return props.children;
  }
}

export default PublicRoute;
