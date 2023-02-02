import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";

const Home = () => {
  
  // hook
  const [auth, setAuth] = useAuth()

  return (
    <div>
      <Jumbotron title="Hello world" subtitle="Welcome to react e-commerce"/>
      {<pre>{JSON.stringify(auth, null, 4)}</pre>}
    </div>
  );
};

export default Home;
