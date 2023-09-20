import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ApplyManager() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user._id);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "/api/user/apply-manager-account",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        toast("applied for manager");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("somthing went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="page-title">ApplyManager</h1>
      <hr />
      <h2>Basic Information</h2>
      <Form onFinish={onFinish}>
        <Row gutter={20}>
          <Col span={8} xs={24} xm={24} lg={8}>
            <Form.Item
              required
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter your first name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} xm={24} lg={8}>
            <Form.Item
              required
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter your last name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} xm={24} lg={8}>
            <Form.Item
              required
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input placeholder="Years of experience" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h2>Project details</h2>
        <Row gutter={20}>
          <Col span={8} xs={24} xm={24} lg={8}>
            <Form.Item
              required
              label="Tower Name"
              name="towerName"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter your Tower Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} xm={24} lg={8}>
            <Form.Item
              required
              label="Project Name"
              name="projectName"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter your projectName" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} xm={24} lg={8}>
            <Form.Item
              required
              label="Room Number"
              name="roomNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter your Room Number" />
            </Form.Item>
          </Col>
          <hr />
          <Col>
            <div className="r-d justify-content-end">
              <Button className="primary-button" htmlType="submit">
                SUBMIT
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
}

export default ApplyManager;
