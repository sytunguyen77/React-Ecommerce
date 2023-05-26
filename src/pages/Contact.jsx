import React from "react";
import Helmet from "../components/Helmet";

const Contact = () => {
   const handleSubmit = (event) => {
      event.preventDefault();
   };

   return (
      <Helmet title="Contact">
         <div className="contact content">
            <h2 className="contact__heading">Feel Free To Contact Us</h2>
            <div className="contact__form form">
               <form onSubmit={handleSubmit}>
                  <div className="input-form">
                     <span>Username</span>
                     <input type="text" name="username" placeholder="Username" required />
                  </div>
                  <div className="input-form">
                     <span>Email</span>
                     <input type="email" name="email" placeholder="Email" required />
                  </div>
                  <div className="input-form">
                     <span>Enter your message</span>
                     <textarea name="message" placeholder="Your message" required />
                  </div>
                  <div className="input-form">
                     <input type="submit" value="Send" />
                  </div>
               </form>
            </div>
            <div className="contact__map">
               <iframe
                  title="Google Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.4972874270593!2d-122.30609482278051!3d47.6553350711944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549014929d8535eb%3A0x6b742c7901b82ba3!2sUniversity%20of%20Washington!5e0!3m2!1sen!2sus!4v1685079638731!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
         </div>
      </Helmet>
   );
};

export default Contact;
