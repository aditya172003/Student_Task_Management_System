const express = require("express");
const studentRoutes = express.Router();
const Authentication = require('../middlewares/authenticate')


const { getStudentTasks,  
        changeTaskStatus, 
        getOverDueTasks,
        getStudentTasksById} = require("../controllers/taskControllers");


const { 
        studentLogin, 
        studentLogout, 
        getStudent } = require("../controllers/studentControllers");




studentRoutes.post('/login', studentLogin);



studentRoutes.get('/logout', Authentication, studentLogout);

studentRoutes.get('/profile', Authentication, getStudent);

studentRoutes.get("/tasks", Authentication, getStudentTasks);

studentRoutes.get('/tasksfilter',Authentication,getStudentTasksById)

studentRoutes.get("/duetasks",Authentication,getOverDueTasks)

studentRoutes.patch("/updatestatus",Authentication,changeTaskStatus);

module.exports = studentRoutes