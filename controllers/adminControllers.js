
const Student = require('../models/studentModels');
const expressAsyncHandler = require("express-async-handler");
const Admin = require('../models/adminModels');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');

const task = require('../models/taskModels');


//@desc Admin register
//@route GET /api/admin/register
//@access public
exports.adminResister = expressAsyncHandler(async (req, res) => {


    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
        return res.status(400).json({message:"Enter the data first"});
    }
    const obj = await Admin.findOne({ email });
    if (obj) {

        return res.status(409).json({message:"Admin has resgistrerd already "});

    }
    try {

        const newAdmin = await new Admin({ name, email, phone, password });
        await Admin.create(newAdmin);
        res.status(200).json({message:"Admin rigistered successfully"});

    }
    catch {
        console.log(err);
        res.status(500).json({Error:"internal server error"});
    }


})




//@desc Admin Login
//@route GET /api/admin/login
//@access public
exports.adminLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Enter the data first " });
    }
    const as = await Admin.findOne({ email })

    if (as) {
        const isMatch = await bcrypt.compare(password, as.password);

        if (!isMatch) {
            return res.status(401).json({Error:"Incorrect password"})
        }
        const token = await as.generateAuthToken()

        res.cookie("jwtoken", token, {

            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });


        (token) ? res.status(200).json({
            message: "login success", jwtoken: token
        }) : res.status(500).json({ message: "Internal server error" });

    } else {
        res.status(404).send({ message: "Admin not found please register first" })

    }

}




//@desc Admin Logout
//@route GET /api/admin/logout
//@access authorized
exports.adminLogout = async (req, res) => {
    try {

        res.cookie('jwtoken', '', { maxAge: 1 });
        res.status(200).json({ message: "Token deleted" });
    }
    catch (err) {
        res.status(500).json({ mess: "Internal server error" })
    }
}


//@desc Admin information
//@route GET /api/admin/getuser
//@access private
exports.getAdmin = async (req, res) => {
    const admin = await Admin.findOne({_id:req.rootuser._id});
    res.status(200).json(admin);
}





//@desc Student profile updation
//@route GET /api/admin/updateprofile
//@access authorized
exports.adminProfileUpdate =  (req, res) => {
    const adminId = req.rootuser._id;

    const { name, email, phone } = req.body;
    Admin.findOneAndUpdate({ _id: adminId }, { $set: { name, email, phone, created_at: new Date() } })
        .then((admin) => {
            console.log(admin);
            res.status(200).json(admin);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server error");

        })
}


exports.updateStudentInfo =  (req,res)=>{
    const studentId = req.params.id;

    const { name, email, phone } = req.body;
      Student.findOneAndUpdate({ _id: studentId }, { $set: { name, email, phone, created_at: new Date() } })
        .then((user) => {
          
            res.status(200).send(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server error");

        })
}


exports.deleteStudent = async (req,res)=>{
    const studentId = req.params.id; // used to fetch dynamic parameter present in url 

    try{
        await Student.deleteOne({_id:studentId});
      
        res.status(200).json({message:"Student deleted"})
    }
    catch(e)
    {
        res.status(500).json({message:"Internal server error"})
    }


        
}

exports.studentResister = async (req, res) => {

  
    const { name, phone, email, password ,department} = req.body;

    if (!name || !phone || !email || !password || !department) {
        return res.status(400).json({message:"Enter the data first"});
    }
    const obj = await Student.findOne({ email });
    if (obj) {

        return res.status(409).json({message:"Student has resgistrerd already "});

    }
    try {
        const newUser = await new Student({ name, email, phone, password,department });

        await Student.create(newUser);
        res.status(200).json({message:"Student rigistered successfully"});

    }
    catch {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }


}

exports.getAllStudents = async (req,res)=>{

    try{
        const data =  await Student.find();
        res.status(200).json(data);
    }
    catch(e)
    {
        res.status(500).json({message:"Internal server error"})
    }


}


exports.assignTask = async (req,res)=>{

    const data  = req.body;

    if(!data.studentId || !data.title || !data.description || !data.deadline)
    {
        res.status(200).json({Error:"Enter the required field first"});
    }
    else
    { 
        try{

            await task.create(data);

            res.status(200).json({message:"Task is assigned to student"});

        }
        catch(e)
        {
            res.status(200).json({Error:"Internal server error"});
        }
    }


}