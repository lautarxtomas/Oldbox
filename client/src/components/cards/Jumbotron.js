import React from "react";
import oldboxLogo from "../../images/oldbox-logo.png";

const Jumbotron = ({ title, subtitle = "Welcome to React E-commerce" }) => {
  return (
    <div
      className="container-fluid jumbotron"
      style={{ marginTop: "-8px", height: "300px"}}
    >
      <div className="row">
        <div className="col text-center p-5">
          <img src={oldboxLogo} />
          <h1 className="fw-bold">
            {title}
          </h1>
          <p  className="fw-bold lead">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
