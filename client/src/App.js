import React from "react";
import { Button, Space } from "antd";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyManager from "./pages/ApplyManager";
import Notification from "./pages/Notification";
import ManagersList from "./pages/admin/ManagersList";
import UsersList from "./pages/admin/UsersList";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-manager"
            element={
              <ProtectedRoute>
                <ApplyManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ManagerList"
            element={
              <ProtectedRoute>
                <ManagersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/userList"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
