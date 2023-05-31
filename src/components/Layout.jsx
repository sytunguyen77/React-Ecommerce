import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";

import MessengerChat from "./MessengerChat";

import Routes from "../routes/Routes";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";

const Layout = () => {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/form" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route
               path={["/", "/catalog/:slug", "/catalog", "/cart", "/accessories", "/contact"]}
               render={(props) => (
                  <>
                     <Header {...props} />
                     <div className="container">
                        <div className="main">
                           <Routes />
                        </div>
                     </div>
                     <Footer />
                     <ProductViewModal />
                  </>
               )}
            />
         </Switch>
         <MessengerChat />
      </BrowserRouter>
   );
};

export default Layout;
