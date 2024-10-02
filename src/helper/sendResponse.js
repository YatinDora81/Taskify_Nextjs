import { NextResponse } from "next/server"

export const sendResponse = ( successStatus , data , message , statusCode  )=>{
    return NextResponse.json({
        success : successStatus ,
        data : data , 
        message : message  
    } , { status : statusCode } );
}