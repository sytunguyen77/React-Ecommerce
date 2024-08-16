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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const validate = (data) => {
    const errors = {};

    // Validate username
    if (!data.username) {
      errors.username = "Username is required.";
    }

    // Validate password
    if (!data.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("name"),
      password: formData.get("password"),
    };

    // Validate input fields
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false); // Stop loading if there are errors
      return;
    }

    // Check if the user exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find((user) => user.username === data.username);

    if (!user) {
      setErrors({ username: "Username does not exist." });
      setIsLoading(false); // Stop loading if user doesn't exist
      return;
    }

    // Check if the password matches
    if (user.password !== data.password) {
      setErrors({ password: "Incorrect password." });
      setIsLoading(false); // Stop loading if password is incorrect
      return;
    }

    // Dispatch login action
    dispatch(login(user));

    // Show success toast notification
    toast.success("Login successful!");

    // Redirect to home page after showing the toast
    setTimeout(() => {
      setIsLoading(false); // Stop loading before redirect
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
              <div
                className={`input__form ${
                  errors.username ? "error-outline" : ""
                }`}
              >
                <span>Username</span>
                <input type="text" name="name" placeholder="UserName" />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
              </div>
              <div
                className={`input__form ${
                  errors.password ? "error-outline" : ""
                }`}
              >
                <span>Password</span>
                <input type="password" name="password" placeholder="Password" />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="input__form">
                <Link to="/reset-password">Forgot Your Password?</Link>
              </div>
              <div className="input__form">
                <input
                  type="submit"
                  value={isLoading ? "Logging In..." : "Log In"}
                  disabled={isLoading}
                />
                {isLoading && <div className="loading-circle"></div>}
              </div>
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
