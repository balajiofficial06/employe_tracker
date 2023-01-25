import React from "react";
import Layout from "../components/Layout";
import { notification, Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Notification() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);

  return (
    <Layout>
      <div className="page-title">
        <h1>Notification</h1>
      </div>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div style={{ float: "right" }}>
            <h1 className="anchor"> Mark all as read</h1>
          </div>
          {user.unSeenNotifications !== undefined &&
            user.unSeenNotifications.map((notification, index) => {
              return (
                <div>
                  <div
                    className="card-text"
                    onClick={() => navigate("/home")}
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
