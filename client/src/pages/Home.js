import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  });
  return (
    <Layout>
      <p>homePage</p>
    </Layout>
  );
}

export default Home;
