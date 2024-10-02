import { sendResponse } from "@/helper/sendResponse";
import TaskModel from "@/models/Task";

export async function GET( req , {params} ){
    try {
        
        const { userid , taskid } = params;

        const task = await TaskModel.findOne({ _id : taskid  , userId : userid});

        return sendResponse( true , task , " Single task api done " , 201 );

    } catch (error) {
        console.log(error);
        return sendResponse( false , error?.message ,  "Error in getting single task"  , 501);
    }
}


export async function DELETE( req , {params} ){
    try {
        
        const { userid , taskid } = params;

        const istask = await TaskModel.findOne({_id : taskid , userId : userid});
        if( !istask ){
            return sendResponse( false, "no data"  , "No such type of task exists" , 401 );
        }

        

        const task = await TaskModel.deleteOne({ _id : taskid  , userId : userid});

        return sendResponse( true , task , "  task delete api done " , 201 );

    } catch (error) {
        console.log(error);
        return sendResponse( false , error?.message ,  "Error in delete single task"  , 501);
    }
}


export async function PUT( req , {params} ){
    try {
        
        const { userid , taskid } = params;

        const istask = await TaskModel.findOne({_id : taskid , userId : userid});
        if( !istask ){
            return sendResponse( false, "no data"  , "No such type of task exists" , 401 );
        }


        const { title , content , status } = await req.json();
        const updatedtask = await TaskModel.findOneAndUpdate( { _id  : taskid  } , { title , content , status , updatedAt : new Date() , userId : userid }  , { new : true } );

        return sendResponse( true , updatedtask , " task updated api done " , 201 );

    } catch (error) {
        console.log(error);
        return sendResponse( false , error?.message ,  "Error in updating single task"  , 501);
    }
}