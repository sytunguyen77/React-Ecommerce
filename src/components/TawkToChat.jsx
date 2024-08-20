import React, { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    // Tawk.to script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/66c444dc146b7af4a43c4be2/1i5napv8v";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return null; // This component doesn't render anything visible
};

export default TawkToChat;
