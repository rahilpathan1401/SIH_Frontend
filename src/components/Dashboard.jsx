import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api';
import '../App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
      try {
        const res = await getProfile(token);
        setUser(res);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const okay = async () => {
    try {
      alert('Your Meeting is not Scheduled');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleButtonClick = () => {
    setShowCalendar(!showCalendar); 
  };

  return (
    <div className="dashboard-container">
      <div className="section1">
        <h1>Hello {user.role === 'student' ? 'Student' : 'Mentor'}</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.number}</p>
        {user.role === 'student' && <p>Your Student ID is: {user._id}</p>}
      </div>
      
      <div className="section3">
        <button onClick={handleButtonClick}>Select Date</button>
        {showCalendar && (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
          />
        )}
      </div>

      <div className="section4">
        <button onClick={okay}>Start A Meeting</button>
      </div>

      <div className="section5">
        Mentor Name: Unknown<br />
        Your Meeting: {startDate ? startDate.toLocaleDateString() : 'DD/MM/YYYY'}<br />
        5:00 PM
      </div>
    </div>
  );
};

export default Dashboard;
