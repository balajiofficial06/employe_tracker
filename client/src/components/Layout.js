import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../layout.css";
import { Badge } from "antd";

function Layout({ children }) {
  const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenu = [
    {
      number: 1,
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      number: 2,
      name: "Block seats",
      path: "/block-seats",
      icon: "ri-calendar-2-line",
    },
    {
      number: 3,
      name: "Apply Manager",
      path: "/apply-manager",
      icon: "ri-hospital-line",
    },
  ];

  const ManagerMenu = [
    {
      number: 1,
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      number: 2,
      name: "Appointments",
      path: "/appointments",
      icon: "ri-calendar-2-line",
    },
    {
      number: 3,
      name: "profile",
      path: `/manager/profile/${user._id !== undefined && user._id}`,
      icon: "ri-profile-line"
    },

  ];
  const adminMenu = [
    {
      number: 1,
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      number: 2,
      name: "Users",
      path: "/admin/userList",
      icon: "ri-user-2-line",
    },
    {
      number: 3,
      name: "Manager",
      path: "/admin/managerList",
      icon: "ri-user-star-fill",
    },
    {
      number: 4,
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-line",
    },
  ];

  const renderMenu = user.isAdmin ? adminMenu : user.isManager ? ManagerMenu : userMenu;
  return (
    <div className="main">
      <div className="r-d layout">
        <div className={`${collapsed ? "collapsed-side-bar" : "side-bar"}`}>
          <div className="sidebar-header">
            {collapsed ? <h1>SB</h1> : <h1>Slot Booking</h1>}
          </div>
          <div className="menu">
            {renderMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`menu-item ${isActive && "active-menu-item"}`}
                  key={menu.number}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            {/* Logout menu Item */}
            <div
              className="r-d menu-item"
              onClick={() => {
                localStorage.clear();
                toast.success("User is logged out");
              }}
            >
              <i className="ri-logout-box-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div
          className="content"
          style={collapsed ? { marginLeft: "100px" } : { marginLeft: "270px" }}
        >
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-circle-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="r-d notification-profile">
              <Badge
                count={
                  user.unSeenNotifications !== undefined &&
                  user.unSeenNotifications.length
                }
                onClick={() => navigate("/notification")}
              >
                <i className="ri-notification-line header-action-icon"></i>
              </Badge>
              <Link className="anchor" to="/profile">
                {user.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
