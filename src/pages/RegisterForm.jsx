import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../redux/authentication/authSlice";
import Helmet from "../components/Helmet";
import form from "../assets/images/Form2.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [validInputs, setValidInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (formData) => {
    const errors = {};
    const validInputs = {};

    const usernamePattern = /^[a-zA-Z0-9_]{6,}$/;
    const phonePattern =
      /^(\+?\d{1,2})?\s?(\(?\d{3}\)?|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

    // Check for empty fields and validity
    if (!formData.username) {
      errors.username = "Username is required.";
    } else if (!usernamePattern.test(formData.username)) {
      errors.username =
        "Username must be at least 6 characters and contain only letters, numbers, or underscores.";
    } else {
      validInputs.username = true;
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!phonePattern.test(formData.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number.";
    } else {
      validInputs.phoneNumber = true;
    }

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    } else {
      validInputs.email = true;
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (!passwordPattern.test(formData.password)) {
      errors.password =
        "Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    } else {
      validInputs.password = true;
    }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("name"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm"),
    };

    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Check if the username already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.username === data.username
    );

    if (userExists) {
      setErrors({ username: "Username already exists." });
      setIsLoading(false);
      return;
    }

    // If validation passes and username is unique, store the user
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

    // Dispatch registration action
    dispatch(
      register({
        username: data.username,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      })
    );

    // Show success toast notification
    toast.success("Registration successful! Please log in.");

    // Redirect to login page after showing the toast
    setTimeout(() => {
      setIsLoading(false);
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
                  placeholder="UserName"
                />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
              </div>
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
                />
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber}</span>
                )}
              </div>
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
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
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
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
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
                  placeholder="Confirm"
                  id="confirm"
                  name="confirm"
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>
              <div className="input__form">
                <input
                  type="submit"
                  value={isLoading ? "Registering..." : "Register"}
                  disabled={isLoading}
                />
                {isLoading && <div className="loading-circle"></div>}
              </div>
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
