const expressAsyncHandler = require("express-async-handler");
const Task = require("../models/taskModels");
const { trusted } = require("mongoose");














//@desc Get logged in Student all Tasks
//@route GET /api/task/Student
//@access authorized
const getStudentTasks = expressAsyncHandler(async (req, res) => {

  let studentId;
 
  if(req.role=='admin')
  {
    studentId = req.params.id;

    
  }
  else{
   
     studentId =req.rootuserId;
  }

  const tasks = await Task.find({studentId})

 
  res.status(200).json(tasks);

})



const getStudentTasksById = expressAsyncHandler(async (req, res) => {

 
  let studentId =' ';
  let status   = req.query.status;
  if(req.role=='admin')
  {
    studentId= req.query.id 
  }
  else{
    studentId =req.rootuserId
  }
  
  if(status =='true')
  {
    status=true
  }
  else 
  {
    status = false
  }
  
  const tasks = await Task.find({studentId,status})
 
  
  if(req.role!='admin')
  {
    if(req.rootuserId!=studentId)
    {
        res.status(403).json({Error:"Unauthorized"})
    }
  }

  if (!tasks) { 
    res.send(404);
    throw new Error("Tasks not found");
  }
  res.status(200).json(tasks);
})








const changeTaskStatus = async(req,res)=>{

  const studentId = req.rootuserId;
  const taskId = req.query.id;
  const status = req.query.status

  const date = Date.now();

  try{

      await Task.findOneAndUpdate({_id:taskId,studentId,deadline:{$gte:date}},{$set:{status}})
      const resp = await Task.find({_id:taskId})
      res.status(200).json(resp);


  }
  catch(e)
  {
    res.status(500).json({Error :e});
  }

}




const getOverDueTasks = async (req,res)=>{

  let studentId = req.rootuserId;
  if(req.role ==='admin')
  {
    studentId=req.params.id;
  }
  if(!studentId)
  {
    res.status(400).json({Error:"Student id is not provided"})
  }
  const date = Date.now();
  try
  {
      const data = await Task.find({studentId, deadline:{$lt:date}});
      res.status(200).json(data);
  }
  catch(e)
  {
    res.status(500).json({Error:"Internal server error"})
  }


}








module.exports = {
  
  getStudentTasks,

  changeTaskStatus,
  getStudentTasksById,
  getOverDueTasks

};
