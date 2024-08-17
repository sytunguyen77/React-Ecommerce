// Importing necessary modules and dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set } from "../redux/product-modal/productModalSlice";
import Button from "./Button";

// Defining the ProductCard component
const ProductCard = (props) => {
  // Using React-Redux Hooks for dispatching actions
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      {/* Link to the individual product page using react-router-dom */}
      <Link to={`/catalog/${props.slug}`}>
        {/* Product image section */}
        <div className="product-card__image">
          <img src={props.img01} alt="" />
          <img src={props.img02} alt="" />
        </div>
        {/* Product name section */}
        <h3 className="product-card__name">{props.name}</h3>
        {/* Product price section */}
        <div className="product-card__price">
          {/* Price formatted with commas */}${props.price}
          <span className="product-card__price__old">
            {/* Old price hard-coded (consider updating or using a prop) */}
            <del>${200}</del>
          </span>
        </div>
      </Link>
      {/* Add to cart button section */}
      <div className="product-card__btn">
        {/* Dispatching action when button is clicked */}
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={() => dispatch(set(props.slug))}
        >
          Quick Shop
        </Button>
      </div>
    </div>
  );
};

// Defining propTypes for typechecking
ProductCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

// Exporting the component
export default ProductCard;
