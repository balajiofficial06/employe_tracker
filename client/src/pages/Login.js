import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onFinish = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/user/login", { email, password });
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
        localStorage.setItem("token", response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("somthing went wrong");
    }
  };
  return (

    //   <div className="authentication">
    //     <div className="authentication-form card">
    //       <Form layout="vertical" onFinish={onFinish}>
    //         <Form.Item label="Email" name="email">
    //           <Input placeholder="enter your email" autoComplete="off" />
    //         </Form.Item>

    //         <Form.Item label="password" name="password">
    //           <Input.Password placeholder="Password" autoComplete="off" />

    //         </Form.Item>
    //         <Button className="primary-button" htmlType="submit">
    //           LOGIN
    //         </Button>
    //         <br />
    //         <a className="Register-Link" href="/register">click to register</a>
    //       </Form>
    //     </div>
    //   </div>
    // );
    <div className="login-page">
      <div className="login-box">
        <p>Login</p>
        <form onSubmit={onFinish}>
          <div className="user-box">
            <input
              required
              name="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              required
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label>Password</label>
          </div>
          <button className="login-button" type="submit">Submit</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/register" className="a2">
            Sign up!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
