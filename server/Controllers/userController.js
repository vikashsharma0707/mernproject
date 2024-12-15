const EmpModel= require("../Models/userModel");
const Task =require("../Models/taskModel")

const userRegistration=async(req, res)=>{
    const {name, email,city, password,category} = req.body;
    const empdata=await EmpModel.create({
        name:name,
        email:email,
        city:city,
        password:password,
        category:category
    })

    res.send("succesfully registered!");
}



// const userLogin=async(req, res)=>{
//     const {email, password} = req.body;
//     const empdata= await EmpModel.find({email:email});
//       if (empdata.length<1)
//       {
//         res.status(401).send("Invalid Email!")
//       }
//       else
//       {
//         if (empdata[0].password!=password)
//         {
//             res.status(401).send("Invalid Credentials!");
//         }
//         else
//         {
//             res.status(200).send(empdata);
//         }
//       }
// }



const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await EmpModel.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }

    // Check if the password matches (plain-text password comparison)
    if (user.password !== password) {
      return res.status(400).json("Invalid credentials");
    }

    // Send user data in response
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};




       const userDashboard =  async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json('User ID is required');
    }
  
    try {
      const user = await EmpModel.findById(userId);
      if (!user) {
        return res.status(404).json('User not found');
      }
  
      const tasks = await Task.find({ assignedTo: userId });
  
      res.json({ user, tasks });
    } catch (error) {
      res.status(500).json('Server error');
    }
  };


  // const Task = require('../models/Task'); // Assuming Task is the model for tasks

// Update task status
// const updateTaskStatus = async (req, res) => {
//   const { taskId, status, userId } = req.body;

//   try {
//     // Find the task by ID and check if it belongs to the user
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     if (task.assignedTo.toString() !== userId) {
//       return res.status(403).json({ message: 'You can only change the status of your own tasks' });
//     }

//     // Update the task status
//     task.status = status;
//     await task.save();

//     res.status(200).json({ message: 'Task status updated successfully', task });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


const updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body; // Use req.body to get the taskId and status

    // Log input data for debugging
    console.log("Request Data:", { taskId, status });

    // Check if taskId or status is missing
    if (!taskId || !status) {
      return res.status(400).json({ message: "Task ID and status are required." });
    }

    // Validate status (ensure it matches client-side status options)
    if (!["Pending", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // Update the task status
    const task = await Task.findByIdAndUpdate(
      taskId, // taskId from req.body
      { status }, // update status
      { new: true } // return the updated task
    );

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Send the updated task back to the client
    res.status(200).json({ message: "Task status updated successfully.", task });
  } catch (error) {
    console.error("Error updating task status:", error.message);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};





module.exports={
    userRegistration,
    userLogin,
    userDashboard,
    updateTaskStatus
    
}