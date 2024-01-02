const express = require("express");
const adminRoutes = express.Router();
const adminAuthentication = require('../middlewares/adminAuthentication')

const {  
      
        getStudentTasksById, 
        getStudentTasks,
        getOverDueTasks} = require("../controllers/taskControllers");


const { assignTask,
        adminResister,
        adminLogin,
        adminProfileUpdate, 
        adminLogout, 
        updateStudentInfo, 
        deleteStudent, 
        studentResister, 
        getAllStudents, 
        getAdmin} = require("../controllers/adminControllers");


adminRoutes.post('/register', adminResister);

adminRoutes.post('/login', adminLogin);

adminRoutes.put('/updateprofile', adminAuthentication, adminProfileUpdate);

adminRoutes.get('/logout', adminAuthentication, adminLogout);

adminRoutes.get('/getadmin', adminAuthentication, getAdmin);

adminRoutes.post('/student',adminAuthentication,studentResister);

adminRoutes.put('/student/:id',adminAuthentication,updateStudentInfo);

adminRoutes.delete('/student/:id',adminAuthentication,deleteStudent);

adminRoutes.get('/students',adminAuthentication,getAllStudents);

adminRoutes.post('/assigntask',adminAuthentication,assignTask);

// required id and status query parameter
adminRoutes.get("/task", adminAuthentication, getStudentTasksById);


adminRoutes.get("/duetasks/:id",adminAuthentication,getOverDueTasks)

adminRoutes.get("/studenttask/:id",adminAuthentication,getStudentTasks);




module.exports = adminRoutes;

