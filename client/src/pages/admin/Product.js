import React from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const AdminProduct = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadCategories();
  });

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
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
            <div className="p-3 mt-2 mb-2 h4 bg-light"> Create products </div>

            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)} // sin esto no se muestra la preview 
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <Select
              bordered={false}
              size="large"
              className="form-select mb-3 w-25"
              placeholder="Choose category"
              onChange={(value) => setCategory(value)}
              showSearch
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c.name}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
