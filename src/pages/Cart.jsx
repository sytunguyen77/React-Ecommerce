// Importing necessary React Hooks
import React, { useEffect, useState } from "react";

// Importing hooks from 'react-redux' for state management
import { useSelector } from "react-redux";

// Importing the mock product data
import productData from "../assets/fake-data/products";

// Importing 'Link' from 'react-router-dom' for routing
import { Link } from "react-router-dom";

// Importing the Helmet component for managing changes to the document head
import Helmet from "../components/Helmet";

// Importing the Button component
import Button from "../components/Button";

// Importing the CartItem component
import CartItem from "../components/CartItem";

// Importing the utility function to format numbers with commas
import numberWithCommas from "../utils/numberWithCommas";

import empty from "../assets/images/EmptyCart.png";

const Cart = () => {
   // Use Redux state to get cart items
   const cartItems = useSelector((state) => state.cartItems.value);

   // Define state variables for cart products, total products count, and total price
   const [cartProducts, setCartProducts] = useState(productData.getCartItemsInfo(cartItems));
   const [totalProducts, setTotalProducts] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);

   // Define effect to update cart products, total products count, and total price whenever cart items change
   useEffect(() => {
      setCartProducts(productData.getCartItemsInfo(cartItems));
      setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
      setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
   }, [cartItems]);

   // Render the component
   return (
      <Helmet title="Giỏ hàng">
         <div className="cart">
            {cartProducts.length > 0 ? (
               <>
                  <div className="cart__info">
                     <div className="cart__info__txt">
                        <p>You have {totalProducts} products in your shopping cart</p>
                        <div className="cart__info__txt__price">
                           <span>Total Cost</span>
                           <span>${totalPrice}</span>
                        </div>
                        <div className="cart__info__btn">
                           <Button size="block">Checkout</Button>
                           <Link to="/catalog">
                              <Button size="block">Continue Shopping</Button>
                           </Link>
                        </div>
                     </div>
                  </div>
                  <div className="cart__list">
                     {/* Render a CartItem component for each product in the cart */}
                     {cartProducts.map((item, index) => (
                        <CartItem item={item} key={index} />
                     ))}
                  </div>
               </>
            ) : (
               <div className="cart__empty">
                  <div className="cart__empty__img">
                     <img src={empty} alt="" />
                  </div>
                  <div className="cart__empty__txt">
                     <h2>Your cart is empty</h2>
                  </div>
                  <Link to="/catalog">
                     <Button size="block">Fill It</Button>
                  </Link>
               </div>
            )}
         </div>
      </Helmet>
   );
};
// Export the Cart component
export default Cart;
