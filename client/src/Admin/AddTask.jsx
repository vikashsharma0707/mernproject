// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const AddTask = () => {
// // //   const [title, setTitle] = useState('');
// // //   const [description, setDescription] = useState('');
// // //   const [dueDate, setDueDate] = useState('');
// // //   const [priority, setPriority] = useState('low');
// // //   const [assignedTo, setAssignedTo] = useState('');
// // //   const [createdBy, setCreatedBy] = useState('');
// // //   const [users, setUsers] = useState([]);

// // //   useEffect(() => {
// // //     // Fetch all users to populate the assign user dropdown
// // //     axios.get('/users')
// // //       .then(response => setUsers(response.data))
// // //       .catch(err => console.error('Error fetching users:', err));
// // //   }, []);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     const taskData = {
// // //       title,
// // //       description,
// // //       dueDate,
// // //       priority,
// // //       assignedTo,
// // //       createdBy,
// // //     };

// // //     try {
// // //       const response = await axios.post("http://local;host:8000/adminuser/userTask", taskData);
// // //       alert('Task created successfully');
// // //     } catch (error) {
// // //       alert('Error creating task');
// // //       console.error(error);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Add Task</h1>
// // //       <form onSubmit={handleSubmit}>
// // //         <div>
// // //           <label>Title</label>
// // //           <input
// // //             type="text"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             required
// // //           />
// // //         </div>
// // //         <div>
// // //           <label>Description</label>
// // //           <textarea
// // //             value={description}
// // //             onChange={(e) => setDescription(e.target.value)}
// // //             required
// // //           />
// // //         </div>
// // //         <div>
// // //           <label>Due Date</label>
// // //           <input
// // //             type="date"
// // //             value={dueDate}
// // //             onChange={(e) => setDueDate(e.target.value)}
// // //             required
// // //           />
// // //         </div>
// // //         <div>
// // //           <label>Priority</label>
// // //           <select
// // //             value={priority}
// // //             onChange={(e) => setPriority(e.target.value)}
// // //           >
// // //             <option value="low">Low</option>
// // //             <option value="medium">Medium</option>
// // //             <option value="high">High</option>
// // //           </select>
// // //         </div>
// // //         {/* <div>
// // //           <label>Assigned to</label>
// // //           <select
// // //             value={assignedTo}
// // //             onChange={(e) => setAssignedTo(e.target.value)}
// // //             required
// // //           >
// // //             <option value="">Select User</option>
// // //             {users.map(user => (
// // //               <option key={user._id} value={user._id}>{user.username}</option>
// // //             ))}
// // //           </select>
// // //         </div> */}
// // //         {/* <div>
// // //           <label>Created by</label>
// // //           <select
// // //             value={createdBy}
// // //             onChange={(e) => setCreatedBy(e.target.value)}
// // //             required
// // //           >
// // //             <option value="">Select User</option>
// // //             {users.map(user => (
// // //               <option key={user._id} value={user._id}>{user.username}</option>
// // //             ))}
// // //           </select>
// // //         </div> */}
// // //         <button type="submit">Add Task</button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default AddTask;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const AddTask = () => {
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [dueDate, setDueDate] = useState('');
// //   const [priority, setPriority] = useState('low');
// //   const [assignedTo, setAssignedTo] = useState('');
// //   const [createdBy, setCreatedBy] = useState('');
// //   const [users, setUsers] = useState([]);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     // Fetch all users to populate the assign user dropdown
// //     axios.get('http://localhost:8000/adminuser/userDisplay')
// //       .then(response => {
// //         console.log('Fetched users:', response.data);  // Check the response here
// //         setUsers(response.data);
// //         setError('');  // Clear any previous errors
// //       })
// //       .catch(err => {
// //         setError('Error fetching users');
// //         console.error(err);
// //       });
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Basic validation: check if assignedTo and createdBy are selected
// //     if (!assignedTo || !createdBy) {
// //       setError('Both "Assigned to" and "Created by" fields are required.');
// //       return;
// //     }

// //     const taskData = {
// //       title,
// //       description,
// //       dueDate,
// //       priority,
// //       assignedTo,
// //       createdBy,
// //     };

// //     try {
// //       const response = await axios.post('http://localhost:8000/adminuser/taskget', taskData);
// //       alert('Task created successfully');
// //       setError('');  // Clear any previous error message
// //     } catch (error) {
// //       alert('Error creating task');
// //       console.error(error);
// //       setError('An error occurred while creating the task.');
// //     }
// //   };

// //   // Rendering users using a traditional for loop instead of map()
// //   const renderUserOptions = (users) => {
// //     const options = [];
// //     for (let i = 0; i < users.length; i++) {
// //       const user = users[i];
// //       options.push(
// //         <option key={user._id} value={user._id}>
// //           {user.username}
// //         </option>
// //       );
// //     }
// //     return options;
// //   };

// //   return (
// //     <div>
// //       <h1>Add Task</h1>
// //       {error && <div className="error" style={{ color: 'red' }}>{error}</div>} {/* Display error if any */}
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Title</label>
// //           <input
// //             type="text"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Description</label>
// //           <textarea
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Due Date</label>
// //           <input
// //             type="date"
// //             value={dueDate}
// //             onChange={(e) => setDueDate(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Priority</label>
// //           <select
// //             value={priority}
// //             onChange={(e) => setPriority(e.target.value)}
// //           >
// //             <option value="low">Low</option>
// //             <option value="medium">Medium</option>
// //             <option value="high">High</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label>Assigned to</label>
// //           <select
// //             value={assignedTo}
// //             onChange={(e) => setAssignedTo(e.target.value)}
// //             required
// //           >
// //             <option value="">Select User</option>
// //             {users.length > 0 ? renderUserOptions(users) : <option>No users available</option>}
// //           </select>
// //         </div>
// //         <div>
// //           <label>Created by</label>
// //           <select
// //             value={createdBy}
// //             onChange={(e) => setCreatedBy(e.target.value)}
// //             required
// //           >
// //             <option value="">Select User</option>
// //             {users.length > 0 ? renderUserOptions(users) : <option>No users available</option>}
// //           </select>
// //         </div>
// //         <button type="submit">Add Task</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddTask;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AddTask = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//     priority: 'low',
//     assignedTo: ''
//   });

//   const [users, setUsers] = useState([]);

//   // Fetch users from the API to populate the "Assign to User" dropdown
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/adminuser/userDisplay');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission to create a new task
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/adminuser/taskget', formData, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       alert('Task created successfully!');
//       setFormData({
//         title: '',
//         description: '',
//         dueDate: '',
//         priority: 'low',
//         assignedTo: ''
//       });
//     } catch (error) {
//       alert('Error creating task: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Create New Task</h2>

//       <input 
//         type="text" 
//         name="title" 
//         placeholder="Task Title" 
//         value={formData.title} 
//         onChange={handleChange} 
//         required 
//       />

//       <textarea 
//         name="description" 
//         placeholder="Task Description" 
//         value={formData.description} 
//         onChange={handleChange} 
//         required 
//       />

//       <input 
//         type="date" 
//         name="dueDate" 
//         value={formData.dueDate} 
//         onChange={handleChange} 
//         required 
//       />

//       <select 
//         name="priority" 
//         value={formData.priority} 
//         onChange={handleChange}
//       >
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//       </select>

//       <select 
//         name="assignedTo" 
//         value={formData.assignedTo} 
//         onChange={handleChange} 
//         required
//       >
//         <option value="">Select User</option>
//         {users.map(user => (
//           <option key={user._id} value={user._id}>{user.name}</option>
//         ))}
//       </select>

//       <button type="submit">Create Task</button>
//     </form>
//   );
// };

// export default AddTask;;







import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    assignedTo: ''
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch users from the API to populate the "Assign to User" dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/adminuser/userDisplay');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/adminuser/taskget', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Task created successfully!');
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'low',
        assignedTo: ''
      });
    } catch (error) {
      alert('Error creating task: ' + (error.response?.data?.message || error.message));
      setError('An error occurred while creating the task.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      
      {error && <div className="error">{error}</div>} {/* Display error if any */}

      <input 
        type="text" 
        name="title" 
        placeholder="Task Title" 
        value={formData.title} 
        onChange={handleChange} 
        required 
      />

      <textarea 
        name="description" 
        placeholder="Task Description" 
        value={formData.description} 
        onChange={handleChange} 
        required 
      />

      <input 
        type="date" 
        name="dueDate" 
        value={formData.dueDate} 
        onChange={handleChange} 
        required 
      />

      <select 
        name="priority" 
        value={formData.priority} 
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select 
        name="assignedTo" 
        value={formData.assignedTo} 
        onChange={handleChange} 
        required
      >
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default AddTask;

