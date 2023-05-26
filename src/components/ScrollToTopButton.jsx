import React from "react";

const ScrollToTopButton = () => {
   const scrollPageToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth", // optional, for smooth scrolling
      });
   };

   return <button onClick={scrollPageToTop}>Scroll to Top</button>;
};

export default ScrollToTopButton;
