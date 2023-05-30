import React, { useEffect } from "react";

function MessengerCustomerChat() {
   useEffect(() => {
      window.fbAsyncInit = function () {
         window.FB.init({
            xfbml: true,
            version: "v11.0",
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
      <div id="fb-root">
         <div className="fb-customerchat" attribution="setup_tool" page_id="110117278674345"></div>
      </div>
   );
}

export default MessengerCustomerChat;
