const express = require("express");
const route = express.Router();

const adminController = require("../Controllers/adminController");
const taskcontroller = require("../Controllers/taskController")

route.post("/userCheck",adminController.adminDataCheck);
route.get("/userDisplay",adminController.userDisplay)
route.get("/userDisplayTask",adminController.userDisplaytask)
route.post("/taskget",taskcontroller.createTask)
route.get("/taskDisplay",taskcontroller.displayTasks)
route.post("/taskdelete",taskcontroller.deleteTask);
route.get("/taskDetail/:id",taskcontroller.productDetail)
route.post("taskEdit",taskcontroller.taskEdit)
route.post("/markComplete/:taskId",taskcontroller.markComplete);
route.post("/markIncomplete/:taskId",taskcontroller.markIncomplete)
route.get("/taskCount",taskcontroller.getDashboardCounts)



module.exports=route;