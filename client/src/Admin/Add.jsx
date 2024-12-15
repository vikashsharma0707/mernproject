


import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "../Css/add.css";

const Add = () => {
  const [tasks, setTasks] = useState([]); // Ensure tasks is always an array
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5); // Adjust this to set how many tasks per page
  const [totalCount, setTotalCount] = useState(0); // State to track total count of tasks for pagination

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/taskshow/showAll?page=${currentPage}&limit=${tasksPerPage}`
      );
      
      // Ensure the response has the correct structure and is an array
      if (Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks); // Set tasks to the array of tasks
        setTotalCount(response.data.totalCount); // Assuming your API returns the total count of tasks
      } else {
        console.error("Tasks are not in an array format");
        toast.error("Failed to load tasks.");
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage]); // Fetch tasks when currentPage changes

  const handleView = (task) => {
    setSelectedTask(task);
    setShowViewModal(true);
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setUpdatedTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
    });
    setShowUpdateModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8000/taskshow/delete/${id}`);
          if (response.status === 200) {
            toast.success("Task deleted successfully!");
            fetchTasks();
          }
        } catch (error) {
          console.error("Failed to delete task:", error);
          toast.error("Failed to delete task. Please try again.");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info("Task deletion canceled.");
      }
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/taskshow/update/${selectedTask._id}`,
        updatedTask
      );
      if (response.status === 200) {
        toast.success("Task updated successfully!");
        fetchTasks();
        setShowUpdateModal(false);
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8000/taskshow/updateStatus/${id}`, {
        status: newStatus,
      });
      if (response.status === 200) {
        toast.success("Status updated successfully!");
        fetchTasks();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const markComplete = async (taskId) => {
    try {
      const response = await axios.post(`http://localhost:8000/adminuser/markComplete/${taskId}`);
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: 'Complete' } : task));
    } catch (err) {
      console.error('Error marking task as complete:', err);
      toast.error('Error marking task as complete.');
    }
  };

  const markIncomplete = async (taskId) => {
    try {
      const response = await axios.post(`http://localhost:8000/adminuser/markIncomplete/${taskId}`);
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: 'Incomplete' } : task));
    } catch (err) {
      console.error('Error marking task as incomplete:', err);
      toast.error('Error marking task as incomplete.');
    }
  };

  const closeViewModal = () => setShowViewModal(false);
  const closeUpdateModal = () => setShowUpdateModal(false);

  const totalPages = Math.ceil(totalCount / tasksPerPage); // Calculate total pages

  if (loading) return <p>Loading tasks...</p>;

  return (
    <>
      <ToastContainer />
      <h4 align="center">Display Data</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
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
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button
                 
                  onClick={() => handleView(task)}
                  style={{  marginLeft:"5px",width:"80px" ,backgroundColor:"blue"}}
                >
                  View
                </button>
                <button
                 
                  onClick={() => handleUpdate(task)}
                  style={{ width:"80px" ,backgroundColor:"red"}}
                >
                  Update
                </button>
                <button
                  style={{ marginLeft:"5px",width:"80px" ,backgroundColor:"blue"}}
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
                <button 
                  onClick={() => task.status === 'Incomplete' ? markComplete(task._id) : markIncomplete(task._id)} 
                  style={{
                    backgroundColor: task.status === 'Complete' ? 'green' : 'red',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    width:"80px"
                  }}>
                  {task.status === 'Complete' ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
              </td>
              <td>
                {task.status === "pending" ? (
                  <button
                    
                    
                    onClick={() => handleStatusChange(task._id, "finished")}
                  >
                    Mark as Finished
                  </button>
                ) : (
                  <button
                    
                  style={{ width:"80px" ,backgroundColor:"blue"}}
                    onClick={() => handleStatusChange(task._id, "pending")}
                  >
                    Mark as Pending
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="pagination"   >
        <button 
          style={{ width:"80px" ,backgroundColor:"blue"}}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span>{currentPage}</span>
        <button 
         style={{ width:"80px" ,backgroundColor:"blue"}}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal for viewing task details */}
      {selectedTask && (
        <Modal show={showViewModal} onHide={closeViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>Task Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Title:</strong> {selectedTask.title}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal for updating task */}
      {selectedTask && (
        <Modal show={showUpdateModal} onHide={closeUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={updatedTask.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={updatedTask.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={updatedTask.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  value={updatedTask.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={updatedTask.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="finished">Finished</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Task
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdateModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Add;











