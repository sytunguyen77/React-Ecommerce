import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "../redux/shopping-cart/cartItemsSlide";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const itemRef = useRef(null);
  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);

  const updateQuantity = (opt) => {
    if (opt === "+") {
      dispatch(updateItem({ ...item, quantity: quantity + 1 }));
    }
    if (opt === "-") {
      dispatch(
        updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 })
      );
    }
  };

  const removeCartItem = () => {
    console.log("removeCartItem");
    dispatch(removeItem(item));
  };

  return (
    <div className="cart__item" ref={itemRef}>
      <div className="cart__item__image">
        <img src={item.product?.image01} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <h3>Product</h3>
          <Link to={`/catalog/${item.slug}`}>
            {`${
              item.product?.title
            } - ${item.color.toUpperCase()} - ${item.size.toUpperCase()}`}
          </Link>
        </div>
        <div className="cart__item__info__price">
          <h3>Price</h3>
          <span>${item.price}</span>
        </div>
        <div className="cart__item__info__quantity">
          <h3>Quantity</h3>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("-")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("+")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="cart__item__info__del">
          <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
