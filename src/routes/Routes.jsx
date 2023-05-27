import React from "react";

import { Route, Switch } from "react-router-dom";
import ScrollToTopButton from "../components/ScrollToTopButton";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Form from "../pages/Form";
import Contact from "../pages/Contact";
import Accessories from "../pages/Accessories";

const Routes = () => {
   return (
      <React.Fragment>
         <ScrollToTopButton />
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/catalog/:slug" component={Product} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/cart" component={Cart} />
            <Route path="/form" component={Form} />
            <Route path="/accessories" component={Accessories} />
            <Route path="/contact" component={Contact} />
         </Switch>
      </React.Fragment>
   );
};

export default Routes;
