import React from "react";
import coming from "../assets/images/coming-soon.jpg";
import Helmet from "../components/Helmet";

const Galleries = () => {
  return (
    <Helmet title="Galleries">
      <div className="galleries">
        <img className="galleries__img" src={coming} alt="" />
      </div>
    </Helmet>
  );
};

export default Galleries;
