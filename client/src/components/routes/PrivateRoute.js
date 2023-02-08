import React from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; // redirects to the child route of PrivateRoute (Dashboard.js)
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

const PrivateRoute = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get('/auth-check');
      if (data.ok) {
        setOk(true)
      } else {
        setOk(false)
      }
    };
    authCheck()
  }, [auth?.token]);

  // client side version
  // useEffect(() => {
  //     if(auth?.token) {
  //         setOk(true)
  //     } else {
  //         setOk(false)
  //     }
  // }, [auth?.token])

  return ok ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
