import React from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import { useState } from "react";

import axios from 'axios'
import toast from "react-hot-toast"
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // hook
  const [auth, setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault() // => website doesnt recharge on submit
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/login`,
        {
          email,
          password
        })

        console.log(data)

        if (data?.error) {
          toast.error(data.error)
        } else {
          localStorage.setItem("auth", JSON.stringify(data))
          setAuth({...auth, token: data.token, user: data.user})
          toast.success("Login successful")
        }
    } catch (err) {
      console.log(err)
      toast.error("Login failed. Try again")
    }
  }

  return (
    <div>
      <Jumbotron title="Login" subtitle="Login page" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
