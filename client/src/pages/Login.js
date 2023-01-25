import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/login", values);
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
    <div className="authentication">
      <div className="authentication-form card">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="enter your email" />
          </Form.Item>

          <Form.Item label="passowrd" name="password">
            <Input placeholder="Password" />
          </Form.Item>
          <Button className="primary-button" htmlType="submit">
            LOGIN
          </Button>
          <br />
          <a href="/register">click to register</a>
        </Form>
      </div>
    </div>
  );
}

export default Login;
