import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "../redux/shopping-cart/cartItemsSlide";

// Router Import
import { Link } from "react-router-dom";

// CartItem Component
const CartItem = (props) => {
   // Redux Dispatcher
   const dispatch = useDispatch();

   // React Refs
   const itemRef = useRef(null);

   // React State Hooks
   const [item, setItem] = useState(props.item);
   const [quantity, setQuantity] = useState(props.item.quantity);

   // React Effect Hooks
   useEffect(() => {
      setItem(props.item);
      setQuantity(props.item.quantity);
   }, [props.item]);

   // Function to update quantity of items in cart
   const updateQuantity = (opt) => {
      if (opt === "+") {
         dispatch(updateItem({ ...item, quantity: quantity + 1 }));
      }
      if (opt === "-") {
         dispatch(updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 }));
      }
   };

   // Function to remove items from cart
   const removeCartItem = () => {
      console.log("removeCartItem");
      dispatch(removeItem(item));
   };

   return (
      <div className="cart__item" ref={itemRef}>
         {/* Item image section */}
         <div className="cart__item__image">
            <img src={item.product?.image01} alt="" />
         </div>
         {/* Item info section */}
         <div className="cart__item__info">
            {/*  Item name section */}
            <div className="cart__item__info__name">
               <Link to={`/catalog/${item.slug}`}>
                  {`${item.product?.title} - ${item.color} - ${item.size}`}
               </Link>
            </div>
            {/*  Item price section */}
            <div className="cart__item__info__price">${item.price}</div>
            {/*  Item quantity section */}
            <div className="cart__item__info__quantity">
               <div className="product__info__item__quantity">
                  <div className="product__info__item__quantity__btn" onClick={() => updateQuantity("-")}>
                     <i className="bx bx-minus"></i>
                  </div>
                  <div className="product__info__item__quantity__input">{quantity}</div>
                  <div className="product__info__item__quantity__btn" onClick={() => updateQuantity("+")}>
                     <i className="bx bx-plus"></i>
                  </div>
               </div>
            </div>
            {/*  Item remove button section */}
            <div className="cart__item__info__del">
               <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
            </div>
         </div>
      </div>
   );
};

// Component Prop Types
CartItem.propTypes = {
   item: PropTypes.object,
};

// Export CartItem Component
export default CartItem;
