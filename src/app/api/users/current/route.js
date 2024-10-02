import { sendResponse } from "@/helper/sendResponse";
import UserModel from "@/models/User";
import jsonwebtoken from "jsonwebtoken"

export async function GET(req){
    try {
        const token = req.cookies.get("authToken")?.value
        const isValid = await jsonwebtoken.decode( token , process.env.JWT_SECRET )
        // console.log(isValid);
        if(isValid){
            const userdata = await UserModel.findOne({_id :isValid?.id});
            // console.log(userdata);
            
            return sendResponse( true , userdata , "All details of User Successfully fetched" , 201 )
        }
            return sendResponse( false , "Error in validating token user" , "Error in validating token user"  , 401 )
    } catch (error) {
        console.log(error);
        return sendResponse( false , "Error in getting details of current user" , "Error in getting details of current user"  , 401 )
    }
}