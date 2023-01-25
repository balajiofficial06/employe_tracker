import { Navigate, useNavigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { userSlice, setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function ProtectedRoute(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const getUser = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info",
        { token: localStorage.getItem("token") },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch {
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(
    (user) => {
      if (!user) {
        getUser();
      }
    },
    [user.name]
  );

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
