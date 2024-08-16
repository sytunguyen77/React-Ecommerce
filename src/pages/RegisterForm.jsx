import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/authentication/authSlice";
import Helmet from "../components/Helmet";
import form from "../assets/images/Form2.png";
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // State management for form errors, valid inputs, loading state, and button click
  const [errors, setErrors] = useState({});
  const [validInputs, setValidInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Form validation function
  const validate = (formData) => {
    const errors = {};
    const validInputs = {};

    // Regular expressions for input validation
    const usernamePattern = /^[a-zA-Z0-9_]{6,}$/;
    const phonePattern =
      /^(\+?\d{1,2})?\s?(\(?\d{3}\)?|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

    // Validate username
    if (!formData.username) {
      errors.username = "Username is required.";
    } else if (!usernamePattern.test(formData.username)) {
      errors.username =
        "Username must be at least 6 characters and contain only letters, numbers, or underscores.";
    } else {
      validInputs.username = true;
    }

    // Validate phone number
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!phonePattern.test(formData.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number.";
    } else {
      validInputs.phoneNumber = true;
    }

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    } else {
      validInputs.email = true;
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (!passwordPattern.test(formData.password)) {
      errors.password =
        "Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    } else {
      validInputs.password = true;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    } else {
      validInputs.confirmPassword = true;
    }

    setValidInputs(validInputs);
    return errors;
  };

  // Handle input changes and clear errors
  const handleInputChange = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
    setValidInputs((prevValidInputs) => ({
      ...prevValidInputs,
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
      username: formData.get("name"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm"),
    };

    // Validate form data
    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.username === data.username
    );

    if (userExists) {
      setErrors({ username: "Username already exists." });
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Add new user to localStorage
    const updatedUsers = [
      ...existingUsers,
      {
        username: data.username,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      },
    ];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Dispatch register action
    dispatch(
      register({
        username: data.username,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      })
    );

    // Show success message
    toast.success("Registration successful! Please log in.");

    // Redirect to login page after a delay
    setTimeout(() => {
      setIsLoading(false);
      setButtonClicked(false);
      history.push("/login");
    }, 2000);
  };

  return (
    <Helmet title="Form">
      <ToastContainer />
      <section>
        <div className="img__bg">
          <img src={form} alt="" />
        </div>
        <div className="content">
          <div className="form">
            <h2>Register</h2>
            <form id="form__register" onSubmit={handleSubmit}>
              {/* Username input field */}
              <div
                className={`input__form ${
                  errors.username
                    ? "error-outline"
                    : validInputs.username
                    ? "valid-outline"
                    : ""
                }`}
              >
                <span>Username</span>
                <input
                  type="text"
                  name="name"
                  id="user"
                  placeholder="Username"
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
              </div>

              {/* Phone number input field */}
              <div
                className={`input__form ${
                  errors.phoneNumber
                    ? "error-outline"
                    : validInputs.phoneNumber
                    ? "valid-outline"
                    : ""
                }`}
              >
                <span>Phone Number</span>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone"
                  onChange={handleInputChange}
                />
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber}</span>
                )}
              </div>

              {/* Email input field */}
              <div
                className={`input__form ${
                  errors.email
                    ? "error-outline"
                    : validInputs.email
                    ? "valid-outline"
                    : ""
                }`}
              >
                <span>Email</span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              {/* Password input field */}
              <div
                className={`input__form ${
                  errors.password
                    ? "error-outline"
                    : validInputs.password
                    ? "valid-outline"
                    : ""
                }`}
              >
                <span>Password</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              {/* Confirm password input field */}
              <div
                className={`input__form ${
                  errors.confirmPassword
                    ? "error-outline"
                    : validInputs.confirmPassword
                    ? "valid-outline"
                    : ""
                }`}
              >
                <span>Confirm Password</span>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirm"
                  name="confirm"
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
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
                      <span className="logging-in-text">Registering...</span>
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>

              {/* Links to login and home page */}
              <div className="input__form">
                <Link to="/login">Log In</Link>
              </div>
              <div className="input__form">
                <Link to="/">Back To Home</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default RegisterForm;
