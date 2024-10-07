// components/AddMember.tsx
"use client"
import React, { useState } from 'react';

const AddMember: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
        const response = await fetch('/api/addmembers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, contact, address }),
          });
      if (!response.ok) {
        throw new Error('Failed to create member');
      }
  
      const data = await response.json();
      console.log('Submitted:', data);
      // Optionally reset form fields or show success message
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  const handleGenerateQR = () => {
    console.log('Generate QR for:', { name, contact, address });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome User</h2>
      <h3 className="text-center mb-4">Fill this form for your registration</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact No</label>
          <input
            type="tel"
            className="form-control"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary me-2">Submit</button>
        <button type="button" className="btn btn-success" onClick={handleGenerateQR}>Already Registered? Get your QR Code</button>
      </form>
    </div>
  );
};

export default AddMember;