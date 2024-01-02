
const mongoose = require("mongoose");
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken')
const studentSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, "Please enter user name "],
    },
    email: {
      type: String,
      required: [true, "Please enter user email"],
    },
    phone:{
        type :String,
        required:[true,"Please enter user phone number"]
    },
    department:{
      type:String,
      required:[true,"Please enter user department "]
    },
    password:{
        type:String,
        required:[true,"Please enter user password"]
    },

  },
   {
    timestamps: true,
  }
);




studentSchema.methods.generateAuthToken  = async function(){
    try{  
    
           let token =jwt.sign({user: this, role:"user"}, process.env.JWT_PASS);
          
           return token
           
    }catch(err){
         console.log(err);
    }
}


studentSchema.pre('save',async function(next){
    if(this.isModified('password')){
         this.password=await bcrypt.hash(this.password,12)
    }
    next();
 })

 module.exports=mongoose.model('Student',studentSchema);
