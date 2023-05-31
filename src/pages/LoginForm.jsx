import React from "react";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import form from "../assets/images/Form.png";

const LoginForm = () => {
   const handleSubmit = (event) => {
      event.preventDefault();
      //  form processing logic here...
   };

   return (
      <Helmet title="Form">
         <section>
            <div className="img__bg">
               <img src={form} alt="" />
            </div>
            <div className="content">
               <div className="form">
                  <h2>LOGIN</h2>
                  <form className="form__login" onSubmit={handleSubmit}>
                     <div className="input__form">
                        <span>Email or Phone Number</span>
                        <input type="text" id="user" placeholder="Email or Phone" />
                     </div>
                     <div className="input__form">
                        <span>Password</span>
                        <input type="password" id="password" required placeholder="Password" minLength="6" />
                     </div>
                     <div className="input__form">
                        <input type="submit" value="Log In" />
                     </div>
                     <div className="input__form">
                        <Link to="/register">Create Account?</Link>
                        {/* <Link to="/forgot-password" id="myBtn">Forgot Password?</Link> */}
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

export default LoginForm;
