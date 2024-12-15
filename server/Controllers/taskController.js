// const userModel = require("../Models/taskModel")
// const userModell = require("../Models/userModel")




// const Task = require('../Models/taskModel');
// const User = require('../Models/userModel');

// // Create Task
// const createTask = async (req, res) => {
//   try {
//     const { title, description, dueDate, priority, assignedTo, createdBy } = req.body;

//     // Check if the assigned user and creator user exist in parallel to optimize DB calls
//     const [assignedUser, creatorUser] = await Promise.all([
//       User.findById(assignedTo),
//       User.findById(createdBy),
//     ]);

//     if (!assignedUser) {
//       return res.status(404).json({ message: 'Assigned user not found' });
//     }

//     if (!creatorUser) {
//       return res.status(404).json({ message: 'Creator user not found' });
//     }

//     const task = new Task({
//       title,
//       description,
//       dueDate,
//       priority,
//       assignedTo,
//       createdBy,
//     });

//     await task.save();
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating task', error: err });
//   }
// };


// const Task = require('../Models/taskModel');
// const User = require('../Models/userModel')

// // Create Task (Admin only)
// const createTask = async (req, res) => {
//   try {
//     const { title, description, dueDate, priority, assignedTo } = req.body;

//     // Check if the user is an admin
//     if (!req.user || req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied. Only admins can create tasks.' });
//     }

//     // Check if the assigned user exists
//     const assignedUser = await User.findById(assignedTo);
//     if (!assignedUser) {
//       return res.status(404).json({ message: 'Assigned user not found' });
//     }

//     const task = new Task({
//       title,
//       description,
//       dueDate,
//       priority,
//       assignedTo,
//       createdBy: req.user._id // Automatically set to the admin's ID
//     });

//     await task.save();
//     res.status(201).json({ message: 'Task created successfully', task });
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating task', error: err.message });
//   }
// };


const Task = require("../Models/taskModel");
const User = require("../Models/userModel");
const data= require("../Models/adminModel")

// Create Task (Admin only)
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo, createdBy } = req.body;

    // Simulate checking if the user is an admin
    const adminUser = await data.findById(createdBy);
    // if (!adminUser || adminUser.role !== 'admin') {
    //   return res.status(403).json({ message: 'Access denied. Only admins can create tasks.' });
    // }

    // Check if the assigned user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(404).json({ message: 'Assigned user not found' });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      createdBy
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};




const displayTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email'); // Populate assigned user details
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/taskController.js



// Controller function to delete a task
// const deleteTask = async (req, res) => {
//   const { id } = req.params; // Get the task ID from the request parameters
//   try {
//     const task = await Task.findByIdAndDelete(id); // Delete the task by ID

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     res.status(200).json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting task' });
//   }
// };



const deleteTask = async(req,res)=>{
  const myid = req.body.id

  const Data = await Task.findByIdAndDelete(myid);
  res.send("Data deleted successfully")
}







// Fetch product details by ID
const productDetail = async (req, res) => {
  const { id } = req.params; // Get the product ID from the URL
  try {
    const product = await Product.findById(id); // Find product by ID
    if (product) {
      res.status(200).json(product); // Return product details as JSON
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product details', error: err });
  }
};



const taskEdit = async(req,res)=>{
  const id = req.body.id;
  const empedit = await stuModel.findById(id);
  res.send(empedit)
}




   


// Mark task as complete
const markComplete = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    
    // Find task by ID and update its status to 'Complete'
    const task = await Task.findByIdAndUpdate(taskId, { status: 'Complete' }, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task); // Return the updated task
  } catch (err) {
    console.error('Error updating task status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark task as incomplete
const markIncomplete = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    
    // Find task by ID and update its status to 'Incomplete'
    const task = await Task.findByIdAndUpdate(taskId, { status: 'Incomplete' }, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task); // Return the updated task
  } catch (err) {
    console.error('Error updating task status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};




; 

// Get total counts for users, total tasks, task status, and priority counts
const getDashboardCounts = async (req, res) => {
  try {
    // Total number of users
    const totalUsers = await User.countDocuments(); 

    // Total number of tasks
    const totalTasks = await Task.countDocuments();

    // Count pending tasks
    const pendingTasksCount = await Task.countDocuments({ status: "pending" });

    // Count completed tasks
    const completedTasksCount = await Task.countDocuments({ status: "completed" });

    // Count tasks by priority
    const lowPriorityCount = await Task.countDocuments({ priority: "low" });
    const mediumPriorityCount = await Task.countDocuments({ priority: "medium" });
    const highPriorityCount = await Task.countDocuments({ priority: "high" });

    // Send all counts in a single response
    res.json({
      totalUsers,
      totalTasks,
      statusCounts: {
        pending: pendingTasksCount,
        completed: completedTasksCount,
      },
      priorityCounts: {
        low: lowPriorityCount,
        medium: mediumPriorityCount,
        high: highPriorityCount,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};








module.exports={
    // createTask,
    // userdisplay
     createTask,
     displayTasks,
     deleteTask,
     productDetail,
     taskEdit,
     markComplete,
     markIncomplete,
     getDashboardCounts
    
}
