import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET( request , { params } ) {
    
    try {
        
        const {userid} = params
        // console.log(userid);

        const currUser = await UserModel.findOne( { "_id" : userid } );
        return NextResponse.json({
            success : true,
            data : currUser ,
            message : "User get successfully"
        })

    } catch (error) {
        console.log("Error in getting single user api");
    
        return NextResponse.json({
            success : false,
            error : error?.message,
            message : "Error in getting single user"
        })
    }


}



export async function DELETE( request , { params } ) {
    
    try {
        
        const {userid} = params
        // console.log(userid);

        const isUser = await UserModel.findOne({_id : userid});
        if( !isUser ){
            return NextResponse.json({
                success : false,
                message : "No user exists"
            })
        }

        const currUser = await UserModel.deleteOne( { "_id" : userid } );
        return NextResponse.json({
            success : true,
            message : "User deleted successfully"
        })

    } catch (error) {
        console.log("Error in getting single user api");
    
        return NextResponse.json({
            success : false,
            error : error?.message,
            message : "Error in deleting single user"
        })
    }


}


export async function PUT( request , {params}) {
    
    try {

        const {userid} = params
        // console.log(userid);

        const isUser = await UserModel.findOne({_id : userid});
        if( !isUser ){
            return NextResponse.json({
                success : false,
                message : "No user exists"
            })
        }

        const { name , email , password } = await request.json()

        const updatedUser = await UserModel.findOneAndUpdate( { _id  : userid } , { name , email ,password } , {new : true} );

        return NextResponse.json({
            success : true,
            data : updatedUser,
            message : "User updated successfully"
        })


    } catch (error) {
        console.log("Error in updating user" , error);
        return NextResponse.json({
            success : false,
            error : error,
            message : "Error in Updating user info"
        })
    }

}