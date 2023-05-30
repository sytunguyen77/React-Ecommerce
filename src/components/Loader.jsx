import React from "react";
import { Puff } from "react-loader-spinner";

const LoadingComponent = () => {
   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
         <Puff
            color="#4267b2"
            height={100}
            width={100}
            timeout={1000} //3 secs
         />
      </div>
   );
};

export default LoadingComponent;
