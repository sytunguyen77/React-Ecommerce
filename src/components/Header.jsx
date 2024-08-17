import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/Logo-4.png";
import SearchModal from "./SearchModal";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authentication/authSlice";
import "react-toastify/dist/ReactToastify.css";

const mainNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Product",
    path: "/catalog",
  },
  {
    display: "Galleries",
    path: "/galleries",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const dispatch = useDispatch();

  // Get current route
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  // Get authentication state and user data
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // Use Redux state to get cart items
  const cartItems = useSelector((state) => state.cartItems.value);

  // Calculate total number of items in the cart
  const totalCartItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  // Add or remove Search Modal
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = () => {
    setIsOpen(true);
  };

  // Create reference to the header
  const headerRef = useRef(null);

  // Add or remove "shrink" class based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current.classList.add("shrink");
        } else {
          headerRef.current.classList.remove("shrink");
        }
      }
    };

    // Attach and clean up scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuLeft = useRef(null);

  // Toggle menu on click
  const menuToggle = () => menuLeft.current.classList.toggle("active");

  // Handle Logout
  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user");

    // Dispatch logout action
    dispatch(logout());
    // dispatch(clearCart());

    // Redirect to home page immediately after logout
    window.location.href = "/";
  };

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="header__menu__right">
            <div
              className="header__menu__item header__menu__right__item header__menu__right__search"
              onClick={openSearch}
            >
              <i className="bx bx-search"></i>
            </div>
            <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* User icon and actions */}
            <div className="header__menu__item header__menu__right__item header__menu__right__user">
              <i
                className={isAuthenticated ? "bx bx-user-circle" : "bx bx-user"}
              ></i>
              <div className="user-action">
                <ul>
                  {isAuthenticated ? (
                    <>
                      <li>
                        <span>Welcome, {user?.fullName}</span>
                      </li>
                      <li onClick={handleLogout}>
                        <i className="bx bx-log-out-circle"></i>
                        <span>Logout</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login">
                          <i className="bx bx-log-in-circle"></i>
                          <span>Login</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/register">
                          <i className="bx bx-user-plus"></i>
                          <span>Register</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="header__menu__item header__menu__right__item header__menu__right__cart">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
                <span className="header__menu__right__count">
                  {totalCartItems}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
