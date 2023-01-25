import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/register", values);
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
    <div className="authentication">
      <div className="authentication-form card">
        <h1 className="card-title"> Hi how are you</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="enter your name" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="enter your email" />
          </Form.Item>

          <Form.Item label="passowrd" name="password">
            <Input placeholder="Password" />
          </Form.Item>
          <Button className="primary-button" htmlType="submit">
            REGISTER
          </Button>
          <br />
          <a href="/login">click to login</a>
        </Form>
      </div>
    </div>
  );
}

export default Register;
