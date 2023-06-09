import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Importing the logo
import logo from "../assets/images/Logo-4.png";

import SearchModal from "./SearchModal";

// Importing hooks from 'react-redux' for state management
import { useSelector } from "react-redux";

// Define main navigation menu
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
      display: "Accessories",
      path: "/accessories",
   },
   {
      display: "Contact",
      path: "/contact",
   },
];

// Header component
const Header = () => {
   // Get current route
   const { pathname } = useLocation();
   const activeNav = mainNav.findIndex((e) => e.path === pathname);

   // Use Redux state to get cart items
   const cartItems = useSelector((state) => state.cartItems.value);

   // Calculate total number of items in the cart
   const totalCartItems = cartItems.reduce((total, item) => total + Number(item.quantity), 0);

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
         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add("shrink");
         } else {
            headerRef.current.classList.remove("shrink");
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

   // Render the header component
   return (
      // The main div wrapping everything, including a ref for manipulating the DOM directly in React
      <div className="header" ref={headerRef}>
         {/* Container for the logo and the menu */}
         <div className="container">
            {/* Logo section */}
            <div className="header__logo">
               {/*  React Router Link to redirect users to the home page when the logo is clicked */}
               <Link to="/">
                  <img src={logo} alt="" />
               </Link>
            </div>
            {/* Menu section of the header */}
            <div className="header__menu">
               {/*Mobile menu toggle icon, which calls menuToggle function when clicked */}
               <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                  <i className="bx bx-menu-alt-left"></i>
               </div>
               {/* Left section of the menu with a ref for manipulating the DOM directly in React */}
               <div className="header__menu__left" ref={menuLeft}>
                  {/*  Close button for the mobile menu, which calls menuToggle function when clicked */}
                  <div className="header__menu__left__close" onClick={menuToggle}>
                     <i className="bx bx-chevron-left"></i>
                  </div>

                  {/*  Map through mainNav array to render navigation links */}
                  {mainNav.map((item, index) => (
                     // Each item in the menu with a key for unique identification
                     <div
                        key={index}
                        className={`header__menu__item header__menu__left__item ${
                           // Classname 'active' is added based on whether the current item is the active navigation link
                           index === activeNav ? "active" : ""
                        }`}
                        onClick={menuToggle} // Calls menuToggle function when the item is clicked
                     >
                        {/*  React Router Link to redirect users to the corresponding path when the item is clicked */}
                        <Link to={item.path}>
                           {/* Display name of the navigation link */}
                           <span>{item.display}</span>
                        </Link>
                     </div>
                  ))}
               </div>

               {/* Right section of the menu */}
               <div className="header__menu__right">
                  {/* Define right side menu items */}
                  {/* Search icon */}
                  <div
                     className="header__menu__item header__menu__right__item header__menu__right__search"
                     onClick={openSearch}
                  >
                     <i className="bx bx-search"></i>
                  </div>
                  <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
                  {/* Shopping cart icon with a React Router Link to redirect users to the cart page when clicked */}
                  <div className="header__menu__item header__menu__right__item header__menu__right__cart">
                     <Link to="/cart">
                        <i className="bx bx-shopping-bag"></i>
                        <span className="header__menu__right__count">{totalCartItems}</span>
                     </Link>
                  </div>
                  {/* User icon */}
                  <div className="header__menu__item header__menu__right__item header__menu__right__user">
                     <i className="bx bx-user"></i>
                     <div className="user-action">
                        <ul>
                           <Link to="/login">
                              <i class="bx bx-log-in-circle"></i>
                              <span>Login</span>
                           </Link>
                           <Link to="/register">
                              <i class="bx bx-user-plus"></i>
                              <span>Register</span>
                           </Link>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
