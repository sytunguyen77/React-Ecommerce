import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch } from "react-redux";
import { addItem } from "../redux/shopping-cart/cartItemsSlide";

// React router import for redirecting to cart
import { withRouter } from "react-router";

// Utility components
import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";

// ProductView component
const ProductView = (props) => {
   const dispatch = useDispatch(); // initializing redux dispatch

   // Ensuring product prop is defined
   let product = props.product;

   if (product === undefined)
      product = {
         price: 0,
         tittle: "",
         colors: [],
         size: [],
      };

   // State Variables
   const [previewImg, setPreviewImg] = useState(product.image01);
   const [descriptionExpand, setDescriptionExpand] = useState(false);
   const [color, setColor] = useState(undefined);
   const [size, setSize] = useState(undefined);
   const [quantity, setQuantity] = useState(1);

   // Function to update the quantity
   const updateQuantity = (type, value) => {
      if (type === "plus") {
         setQuantity(quantity + 1);
      } else {
         setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
      }
   };

   // Resetting states when product changes
   useEffect(() => {
      setPreviewImg(product.image01);
      setQuantity(1);
      setColor(undefined);
      setSize(undefined);
   }, [product]);

   // Check if color and size are selected
   const check = () => {
      if (color === undefined) {
         alert("Vui lòng chọn màu sắc!");
         return false;
      }

      if (size === undefined) {
         alert("Vui lòng chọn kích cỡ");
         return false;
      }

      return true;
   };

   // Add the selected product to the cart
   const addToCart = () => {
      if (check()) {
         dispatch(
            addItem({
               slug: product.slug,
               color: color,
               size: size,
               quantity: quantity,
               price: product.price,
            })
         );
         alert("success");
      }
   };

   // Add to cart and then redirect to cart
   const goToCart = () => {
      if (check()) {
         dispatch(
            addItem({
               slug: product.slug,
               color: color,
               size: size,
               quantity: quantity,
               price: product.price,
            })
         );
         props.history.push("/cart");
      }
   };

   // Main component return
   return (
      // Main product div
      <div className="product">
         {/*  Section for product images */}
         <div className="product__images">
            <div className="product__images__list">
               {/*  Image item 1 */}
               <div className="product__images__list__item" onClick={() => setPreviewImg(product.image01)}>
                  <img src={product.image01} alt="" />
               </div>
               {/* // Image item 2 */}
               <div className="product__images__list__item" onClick={() => setPreviewImg(product.image02)}>
                  <img src={product.image02} alt="" />
               </div>
            </div>
            {/* // Main product image */}
            <div className="product__images__main">
               <img src={previewImg} alt="" />
            </div>
            {/* // Section for product description */}
            <div className={`product-description ${descriptionExpand ? "expand" : ""}`}>
               <div className="product-description__title">Product details</div>
               {/* // Product description content */}
               <div
                  className="product_description__content"
                  dangerouslySetInnerHTML={{ __html: product.description }}
               ></div>
               {/* // Toggle button for expanding or collapsing description */}
               <div className="product-description__toggle">
                  <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                     {descriptionExpand ? "Collapse" : "See More"}
                  </Button>
               </div>
            </div>
         </div>
         {/* // Section for product information */}
         <div className="product__info">
            {/* // Product title */}
            <h1 className="product__info__title">{product.title}</h1>
            {/* // Product price */}
            <div className="product__info__item">
               <span className="product__info__item__price">{numberWithCommas(product.price)}</span>
            </div>
            {/* // Color selection section */}
            <div className="product__info__item">
               <div className="product__info__item__title">Color</div>
               {/* // List of colors */}
               <div className="product__info__item__list">
                  {product.colors.map((item, index) => (
                     // Color item
                     <div
                        key={index}
                        className={`product__info__item__list__item ${color === item ? "active" : " "}`}
                        onClick={() => setColor(item)}
                     >
                        <div className={`circle bg-${item}`}></div>
                     </div>
                  ))}
               </div>
            </div>
            {/* // Size selection section */}
            <div className="product__info__item">
               <div className="product__info__item__title">Size</div>
               {/* // List of sizes */}
               <div className="product__info__item__list">
                  {product.size.map((item, index) => (
                     // Size item
                     <div
                        key={index}
                        className={`product__info__item__list__item ${size === item ? "active" : " "}`}
                        onClick={() => setSize(item)}
                     >
                        <span className="product__info__item__list__item__size">{item}</span>
                     </div>
                  ))}
               </div>
            </div>
            {/* // Quantity selection section */}
            <div className="product__info__item">
               <div className="product__info__item__title">Quantity</div>
               {/* // Quantity input and controls */}
               <div className="product__info__item__quantity">
                  {/* // Decrease quantity button */}
                  <div className="product__info__item__quantity__btn" onClick={() => updateQuantity("minus")}>
                     <i className="bx bx-minus"></i>
                  </div>
                  {/* // Current quantity */}
                  <div className="product__info__item__quantity__input">{quantity}</div>
                  {/* // Increase quantity button */}
                  <div className="product__info__item__quantity__btn" onClick={() => updateQuantity("plus")}>
                     <i className="bx bx-plus"></i>
                  </div>
               </div>
            </div>
            {/* // Buttons to add to cart and buy now */}
            <div className="product__info__item">
               <Button onClick={() => addToCart()}>Add To Bag</Button>
               <Button onClick={() => goToCart()}>Buy Now</Button>
            </div>
         </div>
         {/* // Product description for mobile */}
         <div className={`product-description  mobile ${descriptionExpand ? "expand" : ""}`}>
            <div className="product-description__title">Product Details</div>
            {/* // Product description content */}
            <div
               className="product_description__content"
               dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
            {/* // Toggle button for expanding or collapsing description */}
            <div className="product-description__toggle">
               <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                  {descriptionExpand ? "Collapse" : "See More"}
               </Button>
            </div>
         </div>
      </div>
   );
};

// Checking prop types for the component
ProductView.propTypes = {
   product: PropTypes.object,
};

// Wrapping the component with withRouter to have access to the history prop for redirection
export default withRouter(ProductView);
