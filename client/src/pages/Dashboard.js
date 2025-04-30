import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [activityLog, setActivityLog] = useState([
    { text: '📋 New patient registered: Riya Das', read: false },
    { text: '🩺 Dr. Sen updated prescription for Arjun Ghosh', read: false },
    { text: '📞 Call scheduled with Mr. Roy at 3 PM', read: false }
  ]);

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    // Simulate incoming new activity every 10 seconds
    const interval = setInterval(() => {
      const newActivities = [
        '🧾 Invoice generated for patient S. Mondal',
        '📌 Follow-up scheduled for Rina Pal',
        '📥 Lab result uploaded for Aditya Kar'
      ];
      const random = newActivities[Math.floor(Math.random() * newActivities.length)];
      setActivityLog(prev => [{ text: random, read: false }, ...prev]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Recalculate unread count when activityLog updates
    const unread = activityLog.filter(item => !item.read).length;
    setNotificationCount(unread);
  }, [activityLog]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const markAllAsRead = () => {
    const updated = activityLog.map(item => ({ ...item, read: true }));
    setActivityLog(updated);
    setNotificationCount(0);
  };

  const filteredActivities = activityLog
    .filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const stats = {
    patients: 134,
    appointments: 17,
    doctors: 8,
    messages: 5,
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      <header className="dashboard-header">
        <div className="profile-info">
          <img src="https://i.pravatar.cc/40" alt="User Avatar" />
          <div>
            <h2>Dr. Sharma</h2>
            <p>Administrator</p>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={toggleDarkMode}>
            {darkMode ? '🌙 Dark' : '☀️ Light'} Mode
          </button>
          <button className="notification-btn" onClick={markAllAsRead}>
            🔔
            {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
          </button>
          <button onClick={() => alert('Open Settings')}>⚙️ Settings</button>
        </div>
      </header>

      <div className="dashboard-clock">
        <div>{time.toLocaleDateString()}</div>
        <div>{time.toLocaleTimeString()}</div>
      </div>

      <section className="dashboard-search-bar">
        <input
          type="text"
          placeholder="Search activities or patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <section className="dashboard-stats">
        <div className="card green">
          <h3>Total Patients</h3>
          <p>{stats.patients}</p>
        </div>
        <div className="card blue">
          <h3>Appointments Today</h3>
          <p>{stats.appointments}</p>
        </div>
        <div className="card orange">
          <h3>Doctors Available</h3>
          <p>{stats.doctors}</p>
        </div>
        <div className="card red">
          <h3>Pending Messages</h3>
          <p>{stats.messages}</p>
        </div>
      </section>

      <section className="dashboard-actions">
        <h2>Quick Actions</h2>
        <div className="actions-buttons">
          <button onClick={() => alert('Book Appointment')}>Book Appointment</button>
          <button onClick={() => alert('View Patient History')}>View History</button>
          <button onClick={() => alert('Manage Patients')}>Manage Patients</button>
          <button onClick={() => alert('View Reports')}>View Reports</button>
        </div>
      </section>

      <section className="dashboard-activity">
        <h2>Recent Activity</h2>
        <ul>
          {filteredActivities.map((item, index) => (
            <li key={index} style={{ opacity: item.read ? 0.6 : 1 }}>
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Patient Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
