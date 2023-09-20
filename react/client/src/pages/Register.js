import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onFinish = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/user/register", { email, name, password });
      if (response.data.success) {
        toast.success(response.data.message);
        toast("redicting to login page");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("somthing went wrong");
    }
  };
  return (
    // <div className="authentication">
    //   <div className="authentication-form card">
    //     <Form layout="vertical" onFinish={onFinish}>
    //       <Form.Item label="Name" name="name">
    //         <Input placeholder="enter your name" autoComplete="off"/>
    //       </Form.Item>

    //       <Form.Item label="Email" name="email">
    //         <Input placeholder="enter your email" autoComplete="off"/>
    //       </Form.Item>

    //       <Form.Item label="passowrd" name="password">
    //         <Input.Password placeholder="Password" autoComplete="off"/>
    //       </Form.Item>
    //       <Button className="primary-button" htmlType="submit">
    //         REGISTER
    //       </Button>
    //       <br />
    //       <a href="/login">click to login</a>
    //     </Form>
    //   </div>
    // </div>
    <div className="login-page">
      <div className="login-box">
        <p>Register</p>
        <form onSubmit={onFinish}>
          <div className="user-box">
            <input
              required
              name="Name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>Name</label>
          </div>
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
          already have an accout?{" "}
          <a href="/login" className="a2">
            Sign up!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
