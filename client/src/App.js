import React from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Menu from "./components/nav/Menu";
import UserDashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './pages/admin/Dashboard'
import AdminRoute from "./components/routes/AdminRoute";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not found
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<PageNotFound/>} replace />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
