import React from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; // redirects to the child route of AdminRoute (Dashboard.js)
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

const AdminRoute = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get('/admin-check');
      if (data.ok) {
        setOk(true)
      } else {
        setOk(false)
      }
    };
    adminCheck()
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading path=""/>; //
};

export default AdminRoute;
