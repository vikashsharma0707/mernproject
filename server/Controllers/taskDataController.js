const Task = require("../Models/taskModel");

// Get all tasks
// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving tasks", error: error.message });
//   }
// };


// const getAllTasks = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query; // Default page is 1 and limit is 10
  
//   try {
//     const tasks = await Task.find()
//       .skip((page - 1) * limit)  // Skip the tasks that are already displayed in previous pages
//       .limit(parseInt(limit))    // Limit the number of tasks per page
//       .sort({ createdAt: -1 });  // Optional: Sort by creation date or any other criteria

//     const totalTasks = await Task.countDocuments(); // Get the total number of tasks
    
//     // Calculate total pages
//     const totalPages = Math.ceil(totalTasks / limit);

//     return res.json({
//       tasks,
//       currentPage: parseInt(page),
//       totalPages,
//       totalTasks,
//     });
//   } catch (error) {
//     console.error("Failed to fetch tasks:", error);
//     res.status(500).json({ message: "Failed to fetch tasks" });
//   }
// };


// Controller to fetch all tasks with sorting, pagination, and filtering
const getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'title', sortOrder = 'asc' } = req.query;

    // Validate the sort options to prevent invalid sort parameters
    const validSortFields = ['title', 'description', 'priority', 'status', 'dueDate'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'title';
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    const tasks = await Task.find()
      .sort({ [sortField]: sortDirection })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCount = await Task.countDocuments();

    res.status(200).json({ 
      tasks, 
      totalCount 
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task", error: error.message });
  }
};

// Add a new task
const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const newTask = new Task({ title, description, dueDate, priority });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error: error.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};

// const Task = require("../models/taskModel");

// Update the status of a task
const updateTaskStatus = async (req, res) => {
    try {
      const { id } = req.params; // Use req.params for the ID
      const { status } = req.body;
  console.log(id, status,"sdfghjk")
      // Validate status
      if (!["pending", "finished"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value." });
      }
  
      const task = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ message: "Task not found." });
      }
  
      res.status(200).json({ message: "Task status updated successfully.", task });
    } catch (error) {
      console.error("Error updating task status:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  


module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus
};
