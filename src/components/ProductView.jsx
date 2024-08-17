import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/shopping-cart/cartItemsSlide";
import { withRouter } from "react-router";
import Button from "./Button";
import payment from "../assets/images/payment.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ProductView = (props) => {
  const dispatch = useDispatch();

  //  Default product object if props.product is undefined
  let product = props.product || {
    price: 0,
    title: "",
    colors: [],
    size: [],
  };

  //  State variables for product selection
  const [previewImg, setPreviewImg] = useState(product.image01);
  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  //  Function to update quantity
  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  //  Reset state when product changes
  useEffect(() => {
    setPreviewImg(product.image01);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  //  Validation function
  const check = () => {
    if (color === undefined) {
      toast.error("Please choose a color");
      return false;
    }
    if (size === undefined) {
      toast.error("Please choose size");
      return false;
    }
    return true;
  };

  //  Function to add item to cart
  const addToCart = () => {
    if (check()) {
      setIsAddingToCart(true);
      dispatch(
        addItem({
          slug: product.slug,
          color: color,
          size: size,
          quantity: quantity,
          price: product.price,
        })
      );
      toast.success("Item added to cart successfully");
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 2000);
    }
  };

  //  Function to add item to cart and redirect to cart page
  const goToCart = () => {
    if (check()) {
      setIsBuying(true);
      dispatch(
        addItem({
          slug: product.slug,
          color: color,
          size: size,
          quantity: quantity,
          price: product.price,
        })
      );
      toast.success("Item added to cart successfully. Redirecting to cart...");
      setTimeout(() => {
        setIsBuying(false);
        props.history.push("/cart");
      }, 2000);
    }
  };

  return (
    <div className="product">
      <ToastContainer />
      {/*  Product image section */}
      <div className="product__images">
        {/* Image list for selection */}
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image01)}
          >
            <img src={product.image01} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image03)}
          >
            <img src={product.image03} alt="" />
          </div>
        </div>
        {/* Main product image with zoom functionality */}
        <div className="product__images__main">
          <InnerImageZoom src={previewImg} alt="" />
        </div>
        {/* Product description for desktop view */}
        <div className="product-description">
          <div className="product-description__title">Product details</div>
          <div
            className="product_description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
      </div>
      {/*  Product info section */}
      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">${product.price}</span>
        </div>
        {/* Color selection */}
        <div className="product__info__item">
          <div className="product__info__item__title">Color</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => setColor(item)}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>
        {/* Size selection */}
        <div className="product__info__item">
          <div className="product__info__item__title">Size</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                <span className="product__info__item__list__item__size">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Quantity selection */}
        <div className="product__info__item">
          <div className="product__info__item__title">Quantity</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        {/* Payment options image */}
        <div className="product__info__item__payment">
          <img src={payment} alt="" />
        </div>
        {/*  Add to cart and Buy now buttons */}
        <div className="product__info__item">
          <Button onClick={addToCart} disabled={isAddingToCart}>
            {isAddingToCart ? (
              <>
                <span className="loading-circle"></span>
                <span className="loading-text">Adding...</span>
              </>
            ) : (
              "Add To Bag"
            )}
          </Button>
          <Button onClick={goToCart} disabled={isBuying}>
            {isBuying ? (
              <>
                <span className="loading-circle"></span>
                <span className="loading-text">Buying...</span>
              </>
            ) : (
              "Buy Now"
            )}
          </Button>
        </div>
      </div>
      {/* Product description for mobile view */}
      <div className="product-description mobile">
        <div className="product-description__title">Product Details</div>
        <div
          className="product_description__content"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
