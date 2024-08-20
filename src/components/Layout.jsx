import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";

// import MessengerChat from "./MessengerChat";
import TawkToChat from "./TawkToChat";

import Routes from "../routes/Routes";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import ResetPasswordForm from "../pages/ResetPasswordForm";

const Layout = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/reset-password" component={ResetPasswordForm} />
        <Route
          path={[
            "/",
            "/catalog/:slug",
            "/catalog",
            "/cart",
            "/accessories",
            "/contact",
          ]}
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
      {/* <MessengerChat /> */}
      <TawkToChat />
    </BrowserRouter>
  );
};

export default Layout;
