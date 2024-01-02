
const Student = require('../models/studentModels');
const expressAsyncHandler = require("express-async-handler");


const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')




//@desc Student Login
//@route GET /api/Student/login
//@access public
exports.studentLogin = async (req, res) => {

    const { email, password } = req.body;

    console.log(req.body)

    if (!email || !password) {
        return res.status(400).json({ message: "Enter the data first " });
    }
    const us = await Student.findOne({ email })

    if (us) {


        const isMatch = await bcrypt.compare(password, us.password);

        if (!isMatch) {
            return res.status(401).send("Incorrect password")
        }



        const token = await us.generateAuthToken()



        res.cookie("jwtoken", token, {

            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });




        (token) ? res.status(200).send({
            message: "login success", jwtoken: token
        }).status(200) : res.status(500).json({ message: "Internal server error" });



    } else {
        res.status(404).send({ message: "Student not found please register first" })

    }

}




//@desc Student Logout
//@route GET /api/Student/logout
//@access authorized
exports.studentLogout = async (req, res) => {
    try {

        res.cookie('jwtoken', '', { maxAge: 1 });
        res.status(200).json({ message: "Token deleted" });
    }
    catch (err) {
        res.status(500).json({ mess: "Internal server error" })
    }
}


//@desc Student information
//@route GET /api/Student/getStudent
//@access private
exports.getStudent = expressAsyncHandler(async (req, res) => {
    const student = await Student.findOne({_id:req.rootuserId})
    res.status(200).send(student);
})










