import React, { useState } from "react";
import Helmet from "../components/Helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.fullName.trim())
      tempErrors.fullName = "Full name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      toast.success("Message has been sent successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Reset form after successful submission
      setFormData({ fullName: "", email: "", message: "" });
    } else {
      // Form is invalid, show error toast
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Helmet title="Contact">
      <div className="contact content">
        <h2 className="contact__heading">Feel Free To Contact Us</h2>
        <div className="contact__form form">
          <form onSubmit={handleSubmit}>
            <div className="input-form">
              <span>Full Name</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.fullName ? "error-input" : ""}
              />
              {errors.fullName && (
                <p className="error-text">{errors.fullName}</p>
              )}
            </div>
            <div className="input-form">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? "error-input" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="input-form">
              <span>Enter your message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className={errors.message ? "error-input" : ""}
              />
              {errors.message && <p className="error-text">{errors.message}</p>}
            </div>
            <div className="input-form">
              <input type="submit" value="Send" />
            </div>
          </form>
        </div>
        <div className="contact__map">
          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.4972874270593!2d-122.30609482278051!3d47.6553350711944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549014929d8535eb%3A0x6b742c7901b82ba3!2sUniversity%20of%20Washington!5e0!3m2!1sen!2sus!4v1685079638731!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <ToastContainer />
    </Helmet>
  );
};

export default Contact;
