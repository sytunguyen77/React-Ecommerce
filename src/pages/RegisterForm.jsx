import React from "react";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import form from "../assets/images/Form2.png";

const RegisterForm = () => {
   const handleSubmit = (event) => {
      event.preventDefault();
      // Your form processing logic here...
   };

   return (
      <Helmet title="Form">
         <section>
            <div className="img__bg">
               <img src={form} alt="" />
            </div>
            <div className="content">
               <div className="form">
                  <h2>Register</h2>
                  <form id="form__register" onSubmit={handleSubmit}>
                     <div className="input__form">
                        <span>Username</span>
                        <input
                           type="text"
                           required
                           name="name"
                           id="user"
                           placeholder="UserName"
                           minLength="6"
                        />
                     </div>
                     <div className="input__form">
                        <span>Phone Number</span>
                        <input
                           type="tel"
                           required
                           id="phoneNumber"
                           name="phoneNumber"
                           placeholder="Phone"
                           pattern="0[0-9]{9}"
                           title="Please enter a valid 10-digit phone number"
                        />
                     </div>
                     <div className="input__form">
                        <span>Email</span>
                        <input type="email" required id="email" name="email" placeholder="Email" />
                     </div>
                     <div className="input__form">
                        <span>Password</span>
                        <input
                           type="password"
                           id="password"
                           required
                           name="password"
                           placeholder="Password"
                           minLength="6"
                        />
                     </div>
                     <div className="input__form">
                        <span>Confirm Password</span>
                        <input type="password" required placeholder="Confirm" id="confirm" minLength="6" />
                     </div>
                     <div className="input__form">
                        <input type="submit" value="Register" />
                     </div>
                     <div className="input__form">
                        <Link to="/form">Log In</Link>
                     </div>
                     <div className="input__form">
                        <Link to="/">Home Page</Link>
                     </div>
                  </form>
               </div>
            </div>
         </section>
      </Helmet>
   );
};

export default RegisterForm;
