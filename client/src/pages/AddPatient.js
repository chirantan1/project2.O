import React, { useState } from 'react';
import './AddPatient.css';

const AddPatient = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    disease: '',
    contact: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({ name: '', age: '', gender: '', disease: '', contact: '', address: '' });
        setSubmitted(true);
        alert('Patient added successfully!');
      } else {
        alert('Failed to add patient');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="add-patient-container">
      <h1>Add New Patient</h1>
      <form className="add-patient-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Disease:</label>
          <input name="disease" value={form.disease} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input name="contact" type="tel" value={form.contact} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea name="address" value={form.address} onChange={handleChange} required />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Patient'}
          </button>
        </div>

        {submitted && <p className="success-msg">✅ Patient added successfully!</p>}
      </form>
    </div>
  );
};

export default AddPatient;
