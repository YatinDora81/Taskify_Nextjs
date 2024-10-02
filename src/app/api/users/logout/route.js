import { sendResponse } from "@/helper/sendResponse";
import { NextResponse } from "next/server";

export async function GET(req) {
    
    try {
        
        const res = NextResponse.json({
            success : true,
            data : "User Logged out successfully",
            message : "User Logged out successfully",
        } , {status : 201});

        res.cookies.set( "authToken" , "" , {expiresIn : new Date(0), httpOnly:true , path : "/" } );
        return res;
    } catch (error) {
        console.log("Error in log out api");
        sendResponse(false , error , "Error in logout api" , 501 )
        
    }

}