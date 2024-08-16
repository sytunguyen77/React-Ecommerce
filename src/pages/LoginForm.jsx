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

  // State management for form errors, loading state, and button click
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Form validation function
  const validate = (data) => {
    const errors = {};

    if (!data.username) {
      errors.username = "Username is required.";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  // Clear errors when user starts typing
  const handleInputChange = (e) => {
    const { name } = e.target;
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

    // Get form data
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    // Validate form data
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Check if user exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find((user) => user.username === data.username);

    if (!user) {
      setErrors({ username: "Username does not exist." });
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Check if password is correct
    if (user.password !== data.password) {
      setErrors({ password: "Incorrect password." });
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

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
              {/* Username input field */}
              <div
                className={`input__form ${
                  errors.username ? "error-outline" : ""
                }`}
              >
                <span>Username</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
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
