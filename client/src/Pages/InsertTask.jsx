// import React, { useState } from 'react';
// import axios from 'axios';

// const InsertTask = () => {
//   // State to store form inputs
//   const [taskData, setTaskData] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//     status: 'pending',
//     priority: 'low',
//   });

//   const [message, setMessage] = useState(''); // To display success or error message
//   const [loading, setLoading] = useState(false); // To show loading state

//   // Handle input change for form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTaskData({
//       ...taskData,
//       [name]: value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page reload
//     setLoading(true); // Start loading
//     setMessage(''); // Clear previous messages

//     try {
//       // Send task data to the backend API
//       const response = await axios.post("http://localhost:8000/userTask/taskCreate", taskData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       // Show success message and clear the form
//       setMessage('✅ Task created successfully!');
//       setTaskData({
//         title: '',
//         description: '',
//         dueDate: '',
//         status: 'pending',
//         priority: 'low'
//       });
//     } catch (error) {
//       // Handle network errors and server errors
//       setMessage(error.response?.data?.message || '❌ Something went wrong. Please try again.');
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   // Get current date in YYYY-MM-DD format for dueDate min
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
//   };

//   return (
//     <div className="create-task-container">
//       <h2>Create New Task</h2>

//       {message && <p className={`message ${message.includes('❌') ? 'error' : 'success'}`}>{message}</p>}

//       <form onSubmit={handleSubmit}>
//         {/* Title */}
//         <div className="form-group">
//           <label>Title</label>
//           <input 
//             type="text" 
//             name="title" 
//             value={taskData.title} 
//             onChange={handleChange} 
//             required 
//             placeholder="Enter task title"
//           />
//         </div>

//         {/* Description */}
//         <div className="form-group">
//           <label>Description</label>
//           <textarea 
//             name="description" 
//             value={taskData.description} 
//             onChange={handleChange} 
//             placeholder="Enter task description"
//           ></textarea>
//         </div>

//         {/* Due Date */}
//         <div className="form-group">
//           <label>Due Date</label>
//           <input 
//             type="date" 
//             name="dueDate" 
//             value={taskData.dueDate} 
//             onChange={handleChange} 
//             min={getTodayDate()} // Set minimum due date to today's date
//             required 
//           />
//         </div>

//         {/* Status */}
//         <div className="form-group">
//           <label>Status</label>
//           <select 
//             name="status" 
//             value={taskData.status} 
//             onChange={handleChange}
//           >
//             <option value="pending">Pending</option>
//             <option value="in-progress">In Progress</option>
//             <option value="complete">Complete</option>
//           </select>
//         </div>

//         {/* Priority */}
//         <div className="form-group">
//           <label>Priority</label>
//           <select 
//             name="priority" 
//             value={taskData.priority} 
//             onChange={handleChange}
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Creating Task...' : 'Create Task'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InsertTask;

import React, { useState } from 'react';
import axios from 'axios';

const InsertTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [userId, setUserId] = useState('');  // User ID should be passed when logged in (could be stored in state or localStorage)
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      priority,
      userId,  // Pass the user ID
    };

    try {
      const response = await axios.post('http://localhost:8000/userTask/taskCreate', taskData);
      setMessage('Task created successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
    } catch (err) {
      setError('Error creating task: ' + err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <button type="submit">Create Task</button>
        </div>
      </form>
    </div>
  );
};

export default InsertTask;

