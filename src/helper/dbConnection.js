import mongoose from "mongoose";


export const connectWithdb =async ()=>{

    // console.log();
    

    if (mongoose.connection?.readyState === 1) {
        console.log("Already connected to the database");
        return;
      }

    try {
        
        await mongoose.connect( process.env.DB_URL ).then(()=>{
            console.log("Db connected Successfully");            
        }).catch((err)=> console.log("Error in connecting db "  , err)
        )

    } catch (error) {
        console.log( "Error in connecting db" , error);
        console.error(error)
        
    }

}