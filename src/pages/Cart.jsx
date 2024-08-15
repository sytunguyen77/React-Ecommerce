import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import productData from "../assets/fake-data/products";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import empty from "../assets/images/EmptyCart.png";

const Cart = () => {
  // Use Redux state to get cart items
  const cartItems = useSelector((state) => state.cartItems.value);

  // Define state variables for cart products, total products count, and total price
  const [cartProducts, setCartProducts] = useState(
    productData.getCartItemsInfo(cartItems)
  );
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Define effect to update cart products, total products count, and total price whenever cart items change
  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems));
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );

    // Save cart items to local storage whenever it changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const notify = () => toast.info("Sorry, this feature is not available yet.");

  return (
    <Helmet title="Cart">
      <ToastContainer />
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
                  <Button size="block" onClick={notify}>
                    Checkout
                  </Button>
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

export default Cart;
