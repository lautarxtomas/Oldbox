import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

export default function CategoryView() {
  // state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProductsByCategory();
  }, [params?.slug]);

  const loadProductsByCategory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${params?.slug}`);
      setCategory(data.category);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={category?.name}
        subtitle={`${products?.length} products found in "${category?.name}"`}
      />
      <div className="container-fluid">
        <div className="row mt-3">
          {products?.map((p) => (
            <div className="col-md-4" key={p._id}>
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
