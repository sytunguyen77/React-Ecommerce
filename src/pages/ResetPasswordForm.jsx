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

    if (!data.newPassword) {
      errors.newPassword = "New Password is required.";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  // Handle input changes and clear errors
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
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    };

    // Validate form data
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Check if the user exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.username === data.username
    );

    if (!userExists) {
      setErrors({ username: "Username does not exist." });
      setIsLoading(false);
      setButtonClicked(false);
      return;
    }

    // Simulate an API call or async operation
    setTimeout(() => {
      // Dispatch reset password action
      const result = dispatch(
        resetPassword({
          username: data.username,
          newPassword: data.newPassword,
        })
      );

      if (result.error) {
        setErrors({ username: result.error });
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
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <Helmet title="Reset Password">
      <ToastContainer />
      <section>
        <div className="content">
          <div className="form">
            <h2>Reset Password</h2>
            <form id="form__resetPassword" onSubmit={handleSubmit}>
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

              {/* New Password input field */}
              <div
                className={`input__form ${
                  errors.newPassword ? "error-outline" : ""
                }`}
              >
                <span>New Password</span>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  onChange={handleInputChange}
                />
                {errors.newPassword && (
                  <span className="error">{errors.newPassword}</span>
                )}
              </div>

              {/* Confirm New Password input field */}
              <div
                className={`input__form ${
                  errors.confirmPassword ? "error-outline" : ""
                }`}
              >
                <span>Confirm New Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
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
