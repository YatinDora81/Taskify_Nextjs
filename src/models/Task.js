import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true,
    },
    createdAt : {
        type  :  Date,
        default : new Date()
    },
    updatedAt : {
        type : Date,
        required : true,
    },
    status : {
        type : String,
        enum : [ "complete" , "pending" , "just-added" ],
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

})


const Task = mongoose.models.Task || new mongoose.model("Task" , TaskSchema);
export default Task;