import { sendResponse } from "@/helper/sendResponse";
import UserModel from "@/models/User"
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST( req , {params} ) {
    
    try {
        const { email , password } = await req.json();
    const isUser = await UserModel.findOne({email});

    if(!isUser){
        return sendResponse(400 , "User Not found" , "User Not found"  , 400 )
    }

    const is = await bcryptjs.compare( password , isUser?.password )
    if( !is ){
        return sendResponse( false , "Password Not Match" ,"Password Not Match" , 400 );
    }

    isUser.password = "";

    const token = jsonwebtoken.sign({email , name : isUser?.name , id : isUser?._id} , process.env.JWT_SECRET ,  {expiresIn : "24h"} );

    const res = NextResponse.json({
        success : true ,
        data : isUser ,
        message : "User login Successfully"
    } , {status : 201})

    res.cookies.set("authToken" , token , { expires :new Date( Date.now() + 3*24*60*60*1000 )  , httpOnly : true } );

    return res
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : "Error in create user api"
        })
    }
}