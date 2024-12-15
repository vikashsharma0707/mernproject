
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import Table from 'react-bootstrap/Table';

const DisplayUsers = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
  });

  // Fetch users data
  useEffect(() => {
    axios.get('http://localhost:8000/adminuser/userDisplay')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error loading data:', err);
      });
  }, []);

  // Handle task submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (!taskDetails.title || !taskDetails.description || !taskDetails.dueDate) {
      alert("Please fill in all task details.");
      return;
    }

    const taskData = {
      ...taskDetails,
      assignedTo: selectedUser,
    };

    axios.post("http://localhost:8000/adminuser/taskget", taskData)
      .then((res) => {
        alert("Task assigned successfully!");
        setShowModal(false); // Close modal
        setTaskDetails({
          title: '',
          description: '',
          dueDate: '',
          priority: 'low',
        });
        setSelectedUser(null); // Reset selected user
      })
      .catch((err) => {
        console.error('Error assigning task:', err);
        alert('Error assigning task');
      });
  };

  const handleAssignTask = (userId) => {
    setSelectedUser(userId);
    setShowModal(true); // Open modal when user is selected
  };

  const renderUsers = data.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.city}</td>
      <td>{user.category}</td>
      <td>
        <button onClick={() => handleAssignTask(user._id)}>Assign Task</button>
      </td>
    </tr>
  ));

  return (
    <>
      {/* Main Content */}
      <main className="content">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Here you can manage users, add new users, and handle administrative tasks.</p>

        {/* Users Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {renderUsers}
          </tbody>
        </Table>

        {/* Task Assignment Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Task to User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleTaskSubmit}>
              <Form.Group controlId="taskTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={taskDetails.title}
                  onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group controlId="taskDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={taskDetails.description}
                  onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group controlId="taskDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={taskDetails.dueDate}
                  onChange={(e) => setTaskDetails({ ...taskDetails, dueDate: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group controlId="taskPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={taskDetails.priority}
                  onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Assign Task
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </main>
    </>
  );
};

export default DisplayUsers;
