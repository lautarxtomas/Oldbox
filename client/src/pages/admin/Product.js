import React from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

const AdminProduct = () => {
  // context
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light"> Create products </div>

            <p>Create products form...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;