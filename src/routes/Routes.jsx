import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ScrollToTopButton from "../components/ScrollToTopButton";
import LoadingComponent from "../components/Loader";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Form from "../pages/Form";
import Contact from "../pages/Contact";
import Accessories from "../pages/Accessories";

const Routes = () => {
   const [loading, setLoading] = useState(false);
   const location = useLocation();

   useEffect(() => {
      setLoading(true);
      const timeoutId = setTimeout(() => setLoading(false), 1000); // adjust the time as per your requirement
      return () => clearTimeout(timeoutId);
   }, [location]); // Whenever the location changes, we will set loading to true

   return (
      <React.Fragment>
         <ScrollToTopButton />
         {loading ? (
            <LoadingComponent />
         ) : (
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/catalog/:slug" component={Product} />
               <Route path="/catalog" component={Catalog} />
               <Route path="/cart" component={Cart} />
               <Route path="/form" component={Form} />
               <Route path="/accessories" component={Accessories} />
               <Route path="/contact" component={Contact} />
            </Switch>
         )}
      </React.Fragment>
   );
};

export default Routes;
