import React, { useState } from "react";
import "./App.css"; // Import your CSS file

const ModalApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Clear form fields and error message when modal closes
    setUsername("");
    setEmail("");
    setPhone("");
    setDob("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email");
      return;
    }
    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      setError("Invalid phone number");
      return;
    }
    // Validate date of birth
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate >= currentDate) {
      setError("Invalid date of birth");
      return;
    }
    // Form submission logic
    alert("Form submitted!");
    closeModal();
  };

  return (
    <div>
 <div className='center'>
      <h2 >User Details Form</h2>
      </div>
      <div className='center'>
      <button className="blue-button" onClick={openModal}>Open Form</button>
      </div>
    {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <button type="submit" className="submit-button">
                Submit
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalApp;
