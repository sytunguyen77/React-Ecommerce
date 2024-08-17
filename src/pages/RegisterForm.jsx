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

  // State for form data, errors, valid inputs, and UI feedback
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [validInputs, setValidInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Validation function for all form inputs
  const validate = (data) => {
    const errors = {};
    const validInputs = {};

    // Regular expressions for input validation
    const namePattern = /^[a-zA-Z\s]{2,}$/;
    const phonePattern =
      /^(\+?\d{1,2})?\s?(\(?\d{3}\)?|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

    // Validate Full Name
    if (!data.fullName) {
      errors.fullName = "Full Name is required.";
    } else if (!namePattern.test(data.fullName)) {
      errors.fullName = "Full Name must contain at least 2 letters.";
    } else {
      validInputs.fullName = true;
    }

    // Validate Phone Number
    if (!data.phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!phonePattern.test(data.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number.";
    } else {
      validInputs.phoneNumber = true;
    }

    // Validate Email
    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(data.email)) {
      errors.email = "Please enter a valid email address.";
    } else {
      validInputs.email = true;
    }

    // Validate Password
    if (!data.password) {
      errors.password = "Password is required.";
    } else if (!passwordPattern.test(data.password)) {
      errors.password =
        "Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    } else {
      validInputs.password = true;
    }

    // Validate Confirm Password
    if (!data.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    } else {
      validInputs.confirmPassword = true;
    }

    return { errors, validInputs };
  };

  // Handle input changes and clear corresponding errors
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    // Validate form data
    const { errors, validInputs } = validate(formData);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setValidInputs(validInputs);
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (userExists) {
      setErrors({ email: "Email already exists." });
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Clear all errors before successful registration
    setErrors({});

    // Add new user to localStorage
    const updatedUsers = [
      ...existingUsers,
      {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
      },
    ];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Dispatch register action
    dispatch(
      register({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
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
              {/* Full Name input field */}
              <div
                className={`input__form ${
                  errors.fullName
                    ? "error-outline"
                    : validInputs.fullName
                    ? "valid-outline"
                    : ""
                }`}
              >
                <span>Full Name</span>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                {errors.fullName && (
                  <span className="error">{errors.fullName}</span>
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
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              {/* Phone Number input field */}
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
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber}</span>
                )}
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
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password input field */}
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
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

              {/* Navigation links */}
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
