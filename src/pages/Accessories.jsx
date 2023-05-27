import React from "react";
import coming from "../assets/images/coming-soon.jpg";
import Helmet from "../components/Helmet";

const Accessories = () => {
   return (
      <Helmet title="Accessories">
         <div className="accessories">
            <img className="accessories__img" src={coming} alt="" />
         </div>
      </Helmet>
   );
};

export default Accessories;
