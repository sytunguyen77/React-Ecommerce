import React, { useEffect } from "react";

const MessengerChat = () => {
   useEffect(() => {
      window.fbAsyncInit = function () {
         window.FB.init({
            xfbml: true,
            version: "v12.0",
         });
      };
      (function (d, s, id) {
         var js,
            fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) return;
         js = d.createElement(s);
         js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
         fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
   }, []);

   return (
      <div>
         {/* Replace YOUR_PAGE_ID with  Facebook page's ID */}
         <div className="fb-customerchat" attribution="setup_tool" page_id="101836999602436"></div>
         <div id="fb-root"></div>
      </div>
   );
};

export default MessengerChat;
