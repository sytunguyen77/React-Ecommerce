import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import ProductViewModal from "./ProductViewModal";
import MessengerCustomerChat from "react-messenger-customer-chat";

import Routes from "../routes/Routes";

const Layout = () => {
   return (
      <BrowserRouter>
         <Route
            render={(props) => (
               <div>
                  <Header {...props} />
                  <div className="container">
                     <div className="main">
                        <Routes />
                     </div>
                  </div>
                  <Footer />
                  <ProductViewModal />
                  <MessengerCustomerChat pageId="101836999602436" appId="557052799699991" />,
               </div>
            )}
         />
      </BrowserRouter>
   );
};

export default Layout;
