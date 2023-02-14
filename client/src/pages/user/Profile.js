import React from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";

const UserProfile = () => {
  // context
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Profile user dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light"> User Profile </div>

            update form...
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;