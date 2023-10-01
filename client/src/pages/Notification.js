import React from "react";
import Layout from "../components/Layout";
import { notification, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userSlice, setUser } from "../redux/userSlice";
import { toast } from "react-hot-toast";

function Notification() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispactch = useDispatch();
  console.log(user);

  const noficationAction = async (action) => {
    try {
      const response = await axios.post(
        `/api/user/${action}`,
        {
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
        dispactch(setUser(response.data.data))
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("somthing went wrong");
      console.log(error)
    }
  };


  return (
    <Layout>
      <div className="page-title">
        <h1>Notification</h1>
      </div>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div style={{ float: "right" }}>
            <h1 className="anchor" onClick={() => { noficationAction('mark-all-notification-as-seen') }}> Mark all as read</h1>
          </div>
          {user.unSeenNotifications !== undefined &&
            user.unSeenNotifications.map((notification, index) => {
              return (
                <div>
                  <div
                    className="notification-message"
                    onClick={() => navigate("/")}
                    key={index}
                  >
                    {notification.message}
                  </div>
                </div>
              );
            })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div style={{ float: "right" }}>
            <h1 className="anchor" onClick={() => { noficationAction('delete-all-notification') }}>Delete all the messages</h1>
          </div>
          {user.seenNotifications !== undefined &&
            user.seenNotifications.map((notification, index) => {
              return (
                <div>
                  <div
                    className="notification-message"
                    onClick={() => navigate("/")}
                    key={index}
                  >
                    {notification.message}
                  </div>
                </div>
              );
            })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notification;
