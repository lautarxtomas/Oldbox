import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Menu = () => {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  // hooks
  const categories = useCategory();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex justify-content-between align-items-center shadow mb-2 sticky-top bg-light">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            HOME
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/shop">
            SHOP
          </NavLink>
        </li>

        <div className="dropdown">
          <li>
            <a
              className="nav-link pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              CATEGORIES
            </a>

            <ul
              className="dropdown-menu"
              style={{ height: "300px", overflow: "scroll" }}
            >
              <li>
                <NavLink className="nav-link" to={`/categories/`}>
                  All Categories
                </NavLink>
              </li>
              {categories?.map((c) => (
                <li key={c._id}>
                  <NavLink className="nav-link" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div>

        <li className="nav-item">
          <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[-2, 11]}
            showZero={true}
          >
            <NavLink className="nav-link" aria-current="page" to="/cart">
              CART
            </NavLink>
          </Badge>
        </li>

        <Search />

        <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/chat">
              CHAT
            </NavLink>
        </li>

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name?.toUpperCase()}
              </a>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`} // si en el user tiene role = 1 es admin, por lo tanto entra a la ruta dashboard/admin, sino, dashboard/user
                  >
                    DASHBOARD
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    LOGOUT
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
};

export default Menu;
