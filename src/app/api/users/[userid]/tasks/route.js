import UserModel from "@/models/User";
import TaskModel from "@/models/Task";
import { sendResponse } from "@/helper/sendResponse";

export async function GET( req ,  {params} ) {
    
    try {
        
        const {userid}  = params;

        //check if user exists
        const isUser = await UserModel.findOne( { _id : userid } );

        if(!isUser){
            return sendResponse( false, "No data" , " No user exists " , 401 );
        }

        const allTask = await TaskModel.find( {userId : userid} );

        return sendResponse( true , allTask , "All post realated to the user is fetched" , 201 )

    } catch (error) {
        
        console.log(error);
        return sendResponse( false, error?.message , "Error in getting all task of user" , 500 );

    }

}


export async function POST( req , {params} ) {
    try {
        
        const {userid}  = params;

        //check if user exists
        const isUser = await UserModel.findOne( { _id : userid } );

        if(!isUser){
            return sendResponse( false, "No data" , " No user exists " , 401 );
        }

        const { title , content  } = await req.json();

        const newTask = await TaskModel.create( { title , content , updatedAt: new Date() , status : "just-added" , userId : userid } );

        return sendResponse( true , newTask , "Created a new post for a user" , 201  );

    } catch (error) {
        console.log(error);
        return sendResponse( false, error?.message , "Error in creating task of user" , 500 );
    }
}