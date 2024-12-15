import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Assuming you're using axios for API calls

const Add = () => {
  const [tasks, setTasks] = useState([]);
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/taskshow/showAll?sortBy=${sortField}&sortOrder=${sortOrder}`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks.');
    }
  };

  // Handle sorting logic
  const handleSort = (field) => {
    if (sortField === field) {
      // If already sorted by this field, toggle sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Otherwise, sort by new field in ascending order
      setSortField(field);
      setSortOrder('asc');
    }
    fetchTasks(); // Refetch tasks with the updated sort parameters
  };

  // Handle view task details
  const handleView = (task) => {
    toast.info(`Viewing task: ${task.title}`);
    // Logic to view task details (like opening a modal or navigating to a detailed page)
  };

  // Handle update task
  const handleUpdate = (task) => {
    toast.info(`Updating task: ${task.title}`);
    // Logic to update the task (like opening a modal with a form pre-filled with task data)
  };

  // Handle delete task
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this task?');
      if (!confirmDelete) return;

      await axios.delete(`/taskshow/delete/${id}`);
      toast.success('Task deleted successfully.');
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task.');
    }
  };

  // Handle status change
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`/taskshow/updateStatus/${id}`, { status });
      toast.success(`Task status changed to ${status}.`);
      fetchTasks(); // Refresh task list after status change
    } catch (error) {
      console.error('Error changing task status:', error);
      toast.error('Failed to update task status.');
    }
  };

  // Fetch tasks when component mounts or when sorting changes
  useEffect(() => {
    fetchTasks();
  }, [sortField, sortOrder]);

  return (
    <>
      <ToastContainer />
      <h4 align="center">Task Management</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
              Title {sortField === 'title' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('description')} style={{ cursor: 'pointer' }}>
              Description {sortField === 'description' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('dueDate')} style={{ cursor: 'pointer' }}>
              Due Date {sortField === 'dueDate' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('priority')} style={{ cursor: 'pointer' }}>
              Priority {sortField === 'priority' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
              Status {sortField === 'status' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
            <th>Actions</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleView(task)}>View</Button>
                <Button variant="primary" size="sm" onClick={() => handleUpdate(task)}>Update</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(task._id)}>Delete</Button>
              </td>
              <td>
                {task.status === 'pending' ? (
                  <Button variant="success" size="sm" onClick={() => handleStatusChange(task._id, 'finished')}>
                    Mark as Finished
                  </Button>
                ) : (
                  <Button variant="warning" size="sm" onClick={() => handleStatusChange(task._id, 'pending')}>
                    Mark as Pending
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Add;


