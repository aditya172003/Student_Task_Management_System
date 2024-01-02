const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    studentId:{
      type:String,
      required:[true,"Student id is required"]
    },
    title: {
      type: String,
      required: [true, "Please add the task title"],
    },
    description: {
      type: String,
      required: [true, "Please add the task description"],
    },
    deadline:{
      type: Date,
      required:[true , "Please assign the task deadline"]
    },
    status:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);




module.exports = mongoose.model("task", taskSchema);
