import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { login } from "../redux/authentication/authSlice";
import Helmet from "../components/Helmet";
import form from "../assets/images/Form.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // State for form data and UI feedback
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Validation function for form inputs
  const validate = (data) => {
    const errors = {};
    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!data.email.includes("@")) {
      errors.email = "Please include an '@' in the email address.";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  // Handle input changes and clear corresponding errors
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors when user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonClicked(true);
    setIsLoading(true);

    // Validate form data
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Check if user exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find((user) => user.email === formData.email);

    if (!user) {
      setErrors({ email: "Email does not exist." });
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Check if password is correct
    if (user.password !== formData.password) {
      setErrors({ password: "Incorrect password." });
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Clear any existing errors before successful login
    setErrors({});

    // Dispatch login action
    dispatch(login(user));

    // Show success message
    toast.success("Login successful!");

    // Redirect to home page after a delay
    setTimeout(() => {
      setIsLoading(false);
      setButtonClicked(false);
      history.push("/");
    }, 2000);
  };

  return (
    <Helmet title="Login">
      <ToastContainer />
      <section>
        <div className="img__bg">
          <img src={form} alt="" />
        </div>
        <div className="content">
          <div className="form">
            <h2>Login</h2>
            <form id="form__login" onSubmit={handleSubmit}>
              {/* Email input field */}
              <div
                className={`input__form ${errors.email ? "error-outline" : ""}`}
              >
                <span>Email</span>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              {/* Password input field */}
              <div
                className={`input__form ${
                  errors.password ? "error-outline" : ""
                }`}
              >
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              {/* Forgot password link */}
              <div className="input__form">
                <Link to="/reset-password">Forgot Your Password?</Link>
              </div>

              {/* Submit button with loading state */}
              <div className="input__form">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-button"
                >
                  {buttonClicked && isLoading ? (
                    <>
                      <span className="loading-circle"></span>
                      <span className="logging-in-text">Logging In...</span>
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>

              {/* Links to register and home page */}
              <div className="input__form">
                <Link to="/register">Create an Account</Link>
              </div>
              <div className="input__form">
                <Link to="/">Back to Home</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default LoginForm;
