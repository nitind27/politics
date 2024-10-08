"use client";
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import { toast } from 'react-toastify';

const AddMember: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [qrId, setQrId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const newErrors: string[] = [];

    // Validate inputs
    if (!name) {
      newErrors.push('Name is required.');
    }

    if (!contact) {
      newErrors.push('Contact number is required.');
    } else if (!/^\d{10}$/.test(contact)) {
      newErrors.push('Contact number must be a 10-digit number.');
    }

    if (!address) {
      newErrors.push('Address is required.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

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
      toast.success(`Member Add Successfully`);
      setQrId(data.qr_id);
      await generatePDF({ name, contact, address, qrId: data.qr_id });
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Faild pelase try again");
      setErrors(prev => [...prev, 'An error occurred while submitting the form.']);
    }
  };

  const generatePDF = async ({ name, contact, address, qrId }: { name: string; contact: string; address: string; qrId: number }) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Member Registration', 14, 20);
    doc.rect(10, 10, 190, 277);

    autoTable(doc, {
      head: [['Field', 'Details']],
      body: [
        ['Name', name],
        ['Contact No', contact],
        ['Address', address],
        ['QR ID', qrId.toString()],
      ],
      startY: 30,
      theme: 'grid',
      styles: {
        cellPadding: 5,
        fontSize: 12,
        overflow: 'linebreak',
        halign: 'left',
        valign: 'middle',
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 14,
      },
    });

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(`https://vishalnawle.in/politics/member.php?pl=?id=${qrId}`, {
        width: 50,
        margin: 1,
      });

      doc.addImage(qrCodeDataUrl, 'PNG', 20, doc.autoTable.previous.finalY + 10, 60, 60);
      doc.save(`${name}_registration.pdf`);
    } catch (error) {
      console.error('Error generating QR Code:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setContact('');
    setAddress('');
    setQrId(null);
    setErrors([]);
  };

  return (
    <div className="container mt-5 p-11 border">
      <h2 className="text-center mb-4">Welcome User</h2>
      <h3 className="text-center mb-4">Fill this form for your registration</h3>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact No</label>
          <input
            type="tel"
            className={`form-control ${errors.some(err => err.includes('Contact number')) ? 'is-invalid' : ''}`}
            maxLength={10}
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {errors.some(err => err.includes('Contact number')) && (
            <div className="invalid-feedback">Contact number must be a 10-digit number.</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddMember;
