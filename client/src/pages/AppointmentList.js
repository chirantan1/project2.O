import React, { useState, useEffect } from 'react';
import './AppointmentList.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Simulating fetch: Replace with your actual fetch call
    setTimeout(() => {
      setAppointments([
        { patient: "John Doe", date: "2025-05-05", time: "10:00 AM", doctor: "Dr. Smith" },
        { patient: "Jane Smith", date: "2025-05-06", time: "2:00 PM", doctor: "Dr. Brown" },
      ]);
    }, 500);

    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="appointment-container">
      <header className="appointment-header">
        <h1>Appointment Schedule</h1>
        <div className="clock">
          <span>{time.toLocaleDateString()}</span>
          <span>{time.toLocaleTimeString()}</span>
        </div>
      </header>

      {appointments.length === 0 ? (
        <p className="no-data">No appointments scheduled yet.</p>
      ) : (
        <div className="appointment-list">
          {appointments.map((a, i) => (
            <div className="appointment-card" key={i}>
              <h3>{a.patient}</h3>
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Time:</strong> {a.time}</p>
              <p><strong>Doctor:</strong> {a.doctor}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
