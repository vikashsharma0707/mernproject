
import { useState, useEffect } from "react";
import axios from "axios";
import '../Css/User.css';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/userLog/userDashboard?userId=${userId}`);
        setUser(res.data.user);
        setTasks(res.data.tasks);
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:8000/userLog/updateTaskStatus`, {
        taskId, 
        status: newStatus
      });

      // Update the task in the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      setError("Error updating task status");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="nav-content">
          <h2 className="welcome-text">Welcome, {user?.name}</h2>
          <p className="email-text">{user?.email}</p>
        </div>
      </nav>

      <div className="content">
        <div className="data">
          <h1>Welcome {user?.name}</h1>
          <p>Email: {user?.email}</p>
        </div>

        <h2>Assigned Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks assigned yet.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li 
                className="task-item" 
                key={task._id} 
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  marginBottom: '15px',
                  borderRadius: '8px',
                  backgroundColor: task.status === 'Completed' ? '#d4edda' : '#f8d7da'
                }}
              >
                <h3 style={{ color: '#333', fontSize: '1.2em' }}>
                  Title: {task.title}
                </h3>
                <p style={{ color: '#555', fontSize: '1em' }}>
                  Description: {task.description}
                </p>
                <p style={{ 
                  color: task.status === 'Completed' ? 'green' : 'red', 
                  fontWeight: 'bold' 
                }}>
                  Status: {task.status}
                </p>
                <p style={{ color: '#777', fontSize: '0.9em' }}>
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </p>

                <button 
                  className="status-button"
                  onClick={() => handleStatusChange(task._id, task.status === 'Completed' ? 'Pending' : 'Completed')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: task.status === 'Completed' ? '#318553   ' : ' #d0054a',

                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width:"100px"
                  }}
                >
                  {task.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
