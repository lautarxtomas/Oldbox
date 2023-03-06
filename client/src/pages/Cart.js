import React from "react";
import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";

const Cart = () => {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subtitle={
          cart?.length
            ? `You have ${cart?.length} item(s) in the cart. ${
                auth?.token ? "" : "Please login to checkout"
              }`
            : "Your cart is empty"
        }
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart?.map((p, index) => (
                 <ProductCardHorizontal p={p} index={index} />
                ))}
              </div>
            </div>

            <UserCartSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
