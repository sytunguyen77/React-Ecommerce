import React, { useEffect } from "react";

const ChatEmbed = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");

    // Set the script source to the URL provided
    script.src = "https://rumbletalk.com/client/?zyxWBbI8";

    // Append the script to the div with the specified ID
    document
      .getElementById("rt-e04764316bd1243c68c68fbd9493edbe")
      .appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document
        .getElementById("rt-e04764316bd1243c68c68fbd9493edbe")
        .removeChild(script);
    };
  }, []);

  return (
    <div style={{ height: "500px" }}>
      <div id="rt-e04764316bd1243c68c68fbd9493edbe"></div>
    </div>
  );
};

export default ChatEmbed;
