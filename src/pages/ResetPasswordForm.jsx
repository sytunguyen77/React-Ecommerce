import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom"; // Import Link from react-router-dom
import { resetPassword } from "../redux/authentication/authSlice";
import Helmet from "../components/Helmet";
import form from "../assets/images/Form3.jpg";
import { ToastContainer, toast } from "react-toastify";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const errors = {};

    // Validate username
    if (!data.username) {
      errors.username = "Username is required.";
    }

    // Validate new password
    if (!data.newPassword) {
      errors.newPassword = "New Password is required.";
    }

    // Validate confirm password
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    };

    // Validate input fields
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Dispatch resetPassword action
    const result = dispatch(
      resetPassword({ username: data.username, newPassword: data.newPassword })
    );

    if (result.error) {
      setErrors({ username: "Username does not exist." });
      return;
    }

    // Show success toast notification
    toast.success("Password reset successful!");

    // Redirect to login page after showing the toast
    setTimeout(() => {
      history.push("/login");
    }, 2000);
  };

  return (
    <Helmet title="Reset Password">
      <ToastContainer />
      <section>
        <div className="img__bg">
          <img src={form} alt="" />
        </div>
        <div className="content">
          <div className="form">
            <h2>Reset Password</h2>
            <form id="form__resetPassword" onSubmit={handleSubmit}>
              <div
                className={`input__form ${
                  errors.username ? "error-outline" : ""
                }`}
              >
                <span>Username</span>
                <input type="text" name="username" placeholder="Username" />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
              </div>
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
                />
                {errors.newPassword && (
                  <span className="error">{errors.newPassword}</span>
                )}
              </div>
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
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>
              <div className="input__form">
                <input type="submit" value="Reset Password" />
              </div>
              <div className="input__form">
                <Link to="/">Back to Home</Link>{" "}
                {/* Add the link to homepage */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default ResetPasswordForm;
