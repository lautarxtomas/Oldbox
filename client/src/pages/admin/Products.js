import React from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const AdminProducts = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light"> Products </div>

            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/update/${p.slug}`}
              >
                <div className="card mb-3 d-flex justify-content-center">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        className="img img-fluid rounded"
                        // style={{height: "200px", marginLeft: "15px" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title"> {p.name} </h5>
                        <p className="card-text"> {p.description} </p>
                        <p className="card-text">
                          <small className="text-multed">
                            {moment(p.createdAt).format(
                              "Do MMMM YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;