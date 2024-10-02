"use client"
import { useContext } from "react"
import Link from 'next/link'
import { UserContext } from "@/helper/userContext"
import { LOGOUT_BE_URL } from "../api_url"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const Header = ()=>{


    const {user , updateUser}= useContext(UserContext)    
    // console.log(user);

    const router = useRouter()

    const logOutHandler = async ()=>{
        try {
            const d =  await fetch(LOGOUT_BE_URL , { method : "GET" } );
            const dd = await d.json();

            if(dd?.success ){

                toast.success("Log Out Successfully😊")
                await updateUser();
                router.push("/auth/login");

            }
        } catch (error) {
            console.log("Error in logout " , error);
            
        }
    }
    

    return (
        <div className=" bg-blue-500 flex  justify-between items-center px-16 py-2 h-[10vh]">
            <div className=" text-5xl font-bold">Taskify</div>
            { user && <div className=" flex justify-center items-center gap-9 text-xl">
                <Link className=" hover:opacity-80 transition-all duration-200" href="/">Home</Link>
                <Link className=" hover:opacity-80 transition-all duration-200" href="/showtasks">Show Tasks</Link>
                <Link className=" hover:opacity-80 transition-all duration-200" href="/addtask">Add Task</Link>
            </div>}
            { user ? <button onClick={logOutHandler} className=" hover:opacity-80 transition-all duration-200 text-xl">Logout</button> : <div className=" flex justify-center items-center text-xl gap-1">
                <Link className=" hover:opacity-80 transition-all duration-200" href="/auth/login">Login</Link>
                <div>/</div>
                <Link className=" hover:opacity-80 transition-all duration-200" href="/auth/signup">Signup</Link>
            </div>}
        </div>
    )
}

export default Header