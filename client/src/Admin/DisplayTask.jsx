import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Css/Count.css"

const DisplayTask = () => {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalTasks: 0,
    statusCounts: {
      pending: 0,
      completed: 0,
    },
    priorityCounts: {
      low: 0,
      medium: 0,
      high: 0,
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/adminuser/taskCount");
        setCounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>

      <div className="count-card"   id="row1" >
        <h2>Total Users</h2>
        <p>{counts.totalUsers}</p>
      </div>

      <div className="count-card "  id="row2" >
        <h2>Total Tasks</h2>
        <p>{counts.totalTasks}</p>
      </div>

      <div className="count-card  "  id="row3" >
        <h2>Pending Tasks</h2>
        <p>{counts.statusCounts.pending}</p>
      </div>

      <div className="count-card"  id="row4" >
        <h2>Completed Tasks</h2>
        <p>{counts.statusCounts.completed}</p>
      </div>

      <div className="count-card"  id="row5" >
        <h2>Low Priority Tasks</h2>
        <p>{counts.priorityCounts.low}</p>
      </div>

      <div className="count-card" id="row6" >
        <h2>Medium Priority Tasks</h2>
        <p>{counts.priorityCounts.medium}</p>
      </div>

      <div className="count-card" id="row7" >
        <h2>High Priority Tasks</h2>
        <p>{counts.priorityCounts.high}</p>
      </div>
    </div>
  );
};

export default DisplayTask;
