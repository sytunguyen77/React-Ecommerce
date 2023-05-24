import React from "react";

import { Link } from "react-router-dom";

import Grid from "./Grid";

import logo from "../assets/images/Logo-3.png";

const footerAboutLinks = [
   {
      display: "Introduction",
      path: "/about",
   },
   {
      display: "Contact",
      path: "/about",
   },
   {
      display: "Recruit",
      path: "/about",
   },
   {
      display: "News",
      path: "/about",
   },
   {
      display: "Shop System",
      path: "/about",
   },
];

const footerCustomerLinks = [
   {
      display: "Return Policy",
      path: "/about",
   },
   {
      display: "Warranty Policy",
      path: "/about",
   },
   {
      display: "Refund Policy",
      path: "/about",
   },
];
const Footer = () => {
   return (
      <footer className="footer">
         <div className="container">
            <Grid col={4} mdCol={2} smCol={1} gap={10}>
               <div>
                  <div className="footer__title">Support Center</div>
                  <div className="footer__content">
                     <p>
                        Contact to order <strong>0123456789</strong>
                     </p>
                     <p>
                        Order issues <strong>0123456789</strong>
                     </p>
                     <p>
                        Comments and Complaints <strong>0123456789</strong>
                     </p>
                  </div>
               </div>
               <div>
                  <div className="footer__title">About Tomo</div>
                  <div className="footer__content">
                     {footerAboutLinks.map((item, index) => (
                        <p key={index}>
                           <Link to={item.path}>{item.display}</Link>
                        </p>
                     ))}
                  </div>
               </div>
               <div>
                  <div className="footer__title">Customer Care</div>
                  <div className="footer__content">
                     {footerCustomerLinks.map((item, index) => (
                        <p key={index}>
                           <Link to={item.path}>{item.display}</Link>
                        </p>
                     ))}
                  </div>
               </div>
               <div className="footer__about">
                  <p>
                     <Link to="/">
                        <img src={logo} className="footer__logo" alt="" />
                     </Link>
                  </p>
                  <p>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quod ipsum adipisci
                     nulla laborum animi commodi. Iure inventore expedita dolorem dolores debitis, repudiandae
                     eaque alias. Optio veritatis at labore aut.
                  </p>
               </div>
            </Grid>
         </div>
      </footer>
   );
};

export default Footer;
