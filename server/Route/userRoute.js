const express = require("express")
const route = express.Router();

const userController = require("../Controllers/userController");

route.post("/userRegistration",userController.userRegistration)
 route.post("/userlogin",userController.userLogin)
 route.get("/userDashboard",userController.userDashboard)
 route.patch('/updateTaskStatus', userController.updateTaskStatus);

module.exports = route;