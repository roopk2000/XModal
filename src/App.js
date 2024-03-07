import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Import your modal CSS file

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setErrorMessage('');
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    if (!username || !email || !phone || !dob) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Invalid email');
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      setErrorMessage('Invalid phone number');
      return;
    }

    const currentDate = new Date();
    const inputDate = new Date(dob);

    if (inputDate > currentDate) {
      setErrorMessage('Invalid date of birth');
      return;
    }

    setErrorMessage('');
    closeModal();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div>
<div className='center'>
      <h2 >User Details Form</h2>
      </div>
      <div className='center'>
      <button className="blue-button" onClick={openModal}>Open Form</button>
      </div>
            {isOpen && (
        <div className="modal">
          <div ref={modalRef} className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={formData.username} onChange={handleChange} />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} />
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
              <button type="submit" className="submit-button">Submit</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
