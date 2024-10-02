"use client"

import { GET_CURRENT_USER_BE_URL } from "@/app/api_url";
import { createContext , useEffect , useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children})=>{

    const [user , setUser ] = useState()
    // console.log("User" , user);

    const is = async()=>{
        try {
            const d = await fetch( GET_CURRENT_USER_BE_URL , {method : "GET"} );
            const dd =await d.json();
            // console.log( "dd" ,  dd);

            if(dd?.success===true){
                setUser( dd?.data );
            }
            else{
                setUser(null)
            }
            
        } catch (error) {
            setUser(null)
            // console.log("Error in User Context Api" , error);
            
        }
    }

    const updateUser = async ()=>{
        await is()
    }

    useEffect(()=>{
        
        is()

    } , [])
    return <UserContext.Provider value={{user ,setUser , updateUser}}>{children}</UserContext.Provider>
}