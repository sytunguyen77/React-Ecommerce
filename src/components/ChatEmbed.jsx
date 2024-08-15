import React from "react";

const ChatEmbed = () => {
  return (
    <div>
      <div
        id="rt-e04764316bd1243c68c68fbd9493edbe"
        data-floating="true"
        data-side="left"
        data-width="300"
        data-height="300"
        data-image="https://d1pfint8izqszg.cloudfront.net/images/floating/blue-circle-floating.png"
        data-close-image="https://d1pfint8izqszg.cloudfront.net/images/floating/blue-circle-close.png"
        data-user-counter="35,12.5"
        data-user-counter-width="75"
        data-user-counter-color="#fff"
        data-message-counter="10,70"
      ></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var script = document.createElement('script');
              script.src = 'https://rumbletalk.com/client/?zyxWBbI8';
              document.body.appendChild(script);
            })();
          `,
        }}
      />
    </div>
  );
};

export default ChatEmbed;
