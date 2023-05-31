import React from "react";

// Importing the Helmet component for managing changes to the document head
import Helmet from "../components/Helmet";

import form from "../assets/images/Form.png";

const LoginForm = () => {
   // Function to handle form submission
   const handleSubmit = (event) => {
      event.preventDefault(); // This prevents the form from refreshing the page

      // Your form processing logic here...
   };

   return (
      <Helmet title="Form">
         <section>
            {/* Start Image Section */}
            <div className="img__bg">
               <img src={form} alt="" />
            </div>
            {/* End Image Section */}
            {/* Start Content Section */}
            <div className="content">
               <div className="form">
                  <h2>LOGIN</h2>
                  <form onSubmit={handleSubmit}>
                     <div className="input__form">
                        <span>Email or Phone Number</span>
                        <input type="text" name="" id="user" placeholder="Email or Phone" />
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
                     {/* <div class="remember-login">
              <label><input type="checkbox" name=""> Remember account</label>
            </div> */}
                     <div className="input__form">
                        <input type="submit" value="Log In" />
                     </div>
                     <div className="input__form">
                        <a href="/auth/register">Create Account?</a>
                        {/* <a href="" id="myBtn">Forgot Password?</a> */}
                     </div>
                     <div className="input__form">
                        <a href="/">Home Page</a>
                     </div>
                  </form>
               </div>
            </div>
            {/* End Content Section */}
         </section>
      </Helmet>
   );
};

export default LoginForm;
