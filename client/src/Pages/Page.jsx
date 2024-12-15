import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tasksPerPage] = useState(10); // Number of tasks per page

  // Load data from API with pagination
  const loadData = async () => {
    const api = `http://localhost:8000/userTask/userDisplay?page=${currentPage}&limit=${tasksPerPage}`;
    try {
      const res = await axios.get(api);
      setData(res.data.tasks); // Set tasks data
      setTotalPages(res.data.totalPages); // Set total pages for pagination
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Run loadData whenever currentPage changes
  useEffect(() => {
    loadData();
  }, [currentPage]);

  // Handle delete task
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/userTask/taskDelete/${id}`);
      setData(data.filter((task) => task._id !== id)); // Remove the deleted task from the list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle status toggle (if complete, change to uncomplete, if uncomplete, change to complete)
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "complete" ? "uncomplete" : "complete";
    try {
      await axios.put(`http://localhost:8000/userTask/taskUpdate/${id}`, { status: newStatus });
      // Update the status in the local state without reloading the whole data
      setData((prevData) =>
        prevData.map((task) =>
          task._id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle page navigation (next/previous)
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="display-container">
      <h1>Display Task Data</h1>

      <div className="task-list">
        {data.map((task) => (
          <div className="task-card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>

            <div className="button-group">
              <button
                onClick={() => toggleStatus(task._id, task.status)}
                className={task.status === "complete" ? "uncomplete-button" : "complete-button"}
              >
                {task.status === "complete" ? "Uncomplete" : "Complete"}
              </button>
            </div>

            <div className="button-group">
              <button onClick={() => handleDelete(task._id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
