import mongoose from "mongoose";
import UserModel from "@/models/User"
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";



export async function POST( request ) {
    
    try {

        const {name , email , password} = await request.json()

        // console.log( request.cookies );
        // console.log( request.headers );

        const isUser = await UserModel.findOne({email : email});
        if(isUser){
            return NextResponse.json({
                success : false,
                data : "User Already exists",
                message : "User Already exists"
            } , { status : 400} )
        }

        const hashPass = await bcryptjs.hash( password , 10 );

        // console.log(hashPass);
        
        
        const newUser = await UserModel.create( { name , email, password : hashPass } )
        newUser.password=""

        const res =  NextResponse.json({
            success : true,
            data : newUser,
            message : "user created successfully"
        })

        const token = jsonwebtoken.sign( {name , email , id : newUser?._id } , process.env.JWT_SECRET ,  {expiresIn : "24h"} );

        res.cookies.set("authToken" , token , {expires : new Date( Date.now() + 3*24*60*60*1000 ) , httpOnly : true});
        
        return res;

        
    } catch (error) {
        console.log("error in create users api" , error);
        return NextResponse.json({
            success : false,
            message : "Error in create user api"
        })
    }

}