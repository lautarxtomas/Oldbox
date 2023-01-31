import Jumbotron from "../components/cards/Jumbotron";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Jumbotron title="Register" subtitle="Register page" />

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <input
              type="text"
              className="form-control mb-4 p-2"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;