import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";

const HeroSlider = (props) => {
   // Destructure data from props
   const data = props.data;

   // Set timeout either from props or default to 3000
   const timeOut = props.timeOut ? props.timeOut : 3000;

   // Define state for the active slide
   const [activeSlide, setActiveSlide] = useState(0);

   // Define the nextSlide function to go to next slide or circle back to the first
   const nextSlide = useCallback(() => {
      const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
      setActiveSlide(index);
   }, [activeSlide, data]);

   // Define the prevSlide function to go to previous slide or circle back to the last
   const prevSlide = () => {
      const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
      setActiveSlide(index);
   };

   // Run the useEffect hook to create an interval for auto slide change
   useEffect(() => {
      if (props.auto) {
         const slideAuto = setInterval(() => {
            nextSlide();
         }, timeOut);
         // Clear interval on component unmount
         return () => {
            clearInterval(slideAuto);
         };
      }
   }, [nextSlide, timeOut, props]);

   // Render the HeroSlider component
   return (
      <div className="hero-slider">
         {/* Map through data array to create a slide for each item */}
         {data.map((item, index) => (
            <HeroSliderItem key={index} item={item} active={index === activeSlide} />
         ))}
         {/* Conditional rendering of control buttons */}
         {props.control ? (
            <div className="hero-slider__control">
               <div className="hero-slider__control__item" onClick={prevSlide}>
                  <i className="bx bx-chevron-left"></i>
               </div>
               <div className="hero-slider__control__item">
                  <div className="index">
                     {activeSlide + 1}/{data.length}
                  </div>
               </div>
               <div className="hero-slider__control__item" onClick={nextSlide}>
                  <i className="bx bx-chevron-right"></i>
               </div>
            </div>
         ) : null}
      </div>
   );
};

// Declare propTypes for HeroSlider
HeroSlider.propTypes = {
   data: PropTypes.array.isRequired,
   control: PropTypes.bool,
   auto: PropTypes.bool,
   TimeOut: PropTypes.number,
};

// Create HeroSliderItem component for individual slides
const HeroSliderItem = (props) => (
   <div className={`hero-slider__item ${props.active ? "active" : ""}`}>
      <div className="hero-slider__item__info">
         <div className={`hero-slider__item__info__title color-${props.item.color}`}>
            <span>{props.item.title}</span>
         </div>
         <div className="hero-slider__item__info__description">
            <span>{props.item.description}</span>
         </div>
         <div className="hero-slider__item__info__btn">
            <Link to={props.item.path}>
               <Button backgroundColor={props.item.color} icon="bx bx-cart" animate={true}>
                  xem chi tiết
               </Button>
            </Link>
         </div>
      </div>
      <div className="hero-slider__item__image">
         <div className={`shape bg-${props.item.color}`}></div>
         <img src={props.item.img} alt="" />
      </div>
   </div>
);

export default HeroSlider;
