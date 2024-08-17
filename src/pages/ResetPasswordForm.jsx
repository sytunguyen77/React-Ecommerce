import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { resetPassword } from "../redux/authentication/authSlice";
import Helmet from "../components/Helmet";
import form from "../assets/images/Form3.jpg";
import { ToastContainer, toast } from "react-toastify";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // State for form data, errors, and UI feedback
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [outlineErrors, setOutlineErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Handle input changes and clear all errors
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear all errors and outline errors when user types in any field
    setErrors({});
    setOutlineErrors({});
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonClicked(true);
    setIsLoading(true);

    // Validate form inputs
    const validationErrors = {};
    const newOutlineErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email is required.";
      newOutlineErrors.email = true;
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
      newOutlineErrors.email = true;
    }

    if (!formData.newPassword) {
      validationErrors.newPassword = "New Password is required.";
      newOutlineErrors.newPassword = true;
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required.";
      newOutlineErrors.confirmPassword = true;
    } else if (formData.newPassword !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
      newOutlineErrors.confirmPassword = true;
    }

    // If there are validation errors, display them and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setOutlineErrors(newOutlineErrors);
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Check if user exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (!userExists) {
      setErrors({ email: "Email does not exist." });
      setOutlineErrors({ email: true });
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Clear all errors before resetting password
    setErrors({});
    setOutlineErrors({});

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Dispatch reset password action
      const result = dispatch(
        resetPassword({
          email: formData.email,
          newPassword: formData.newPassword,
        })
      );

      if (result.error) {
        setErrors({ email: result.error });
        setOutlineErrors({ email: true });
        setIsLoading(false);
        setButtonClicked(false);
        return;
      }

      // Show success message
      toast.success("Password reset successful!");

      // Redirect to login page after a delay
      setTimeout(() => {
        setIsLoading(false);
        setButtonClicked(false);
        history.push("/login");
      }, 2000);
    }, 1000);
  };

  return (
    <Helmet title="Reset Password">
      <ToastContainer />
      <section>
        <div className="content">
          <div className="form">
            <h2>Reset Password</h2>
            <form id="form__resetPassword" onSubmit={handleSubmit}>
              {/* Email input field */}
              <div
                className={`input__form ${
                  outlineErrors.email ? "error-outline" : ""
                }`}
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

              {/* New Password input field */}
              <div
                className={`input__form ${
                  outlineErrors.newPassword ? "error-outline" : ""
                }`}
              >
                <span>New Password</span>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
                {errors.newPassword && (
                  <span className="error">{errors.newPassword}</span>
                )}
              </div>

              {/* Confirm New Password input field */}
              <div
                className={`input__form ${
                  outlineErrors.confirmPassword ? "error-outline" : ""
                }`}
              >
                <span>Confirm New Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
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
                      <span className="logging-in-text">
                        Resetting Password...
                      </span>
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>

              {/* Link to home page */}
              <div className="input__form">
                <Link to="/">Back to Home</Link>
              </div>
            </form>
          </div>
        </div>
        <div className="img__bg">
          <img src={form} alt="" />
        </div>
      </section>
    </Helmet>
  );
};

export default ResetPasswordForm;
