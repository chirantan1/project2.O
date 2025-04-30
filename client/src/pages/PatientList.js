import React, { useEffect, useState } from 'react';
import './PatientList.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    fetch('http://localhost:5000/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error('Failed to fetch patients:', err));

    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="patient-list-container">
      <header className="patient-list-header">
        <h1>Patient Records</h1>
        <div className="clock">
          <span>{time.toLocaleDateString()}</span>
          <span>{time.toLocaleTimeString()}</span>
        </div>
      </header>

      {patients.length === 0 ? (
        <p className="no-data">No patients found.</p>
      ) : (
        <div className="patient-cards">
          {patients.map((p, i) => (
            <div className="patient-card" key={i}>
              <h3>{p.name}</h3>
              <p><strong>Age:</strong> {p.age}</p>
              <p><strong>Disease:</strong> {p.disease}</p>
              <p><strong>Contact:</strong> {p.contact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
