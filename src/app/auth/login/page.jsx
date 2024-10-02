"use client";

import { LOGIN_BE_URL } from "@/app/api_url";
import { UserContext } from "@/helper/userContext";
import { useRouter } from "next/navigation";
import { useState , useContext } from "react";
import toast from "react-hot-toast";
import { IoEye , IoEyeOff } from "react-icons/io5";
import { BeatLoader } from "react-spinners";

export default function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error , setError] = useState("");

  const {updateUser} = useContext(UserContext);


  const router = useRouter()
    // console.log(data);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
        data.email === "" ||
        data.password === "" 
      ) {
        setError("Please Fill all the details");
        return;
      }
      
  
      setLoading(true)
  
      try {
        const d = await fetch(LOGIN_BE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const da = await d.json();
  
        // console.log(da);
        if (da?.success) {
          setError("");
          setData({ email: "", password: "", confirmPassword: "", name: "" });
          toast.success("User Login Successfull");
          await updateUser()
          router.push("/showtasks")
        }else{
          setError(da?.message);
          toast.error(da?.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Internal Server Error!!!")
      }
  
      setLoading(false)
  };

  return (
    <div className="  w-[75%] mx-auto flex flex-col items-center justify-evenly min-h-[80vh] py-10">
      <h1 className=" text-5xl">Login</h1>
      <form
        onSubmit={submitHandler}
        className=" border border-white p-10 rounded-2xl flex flex-col justify-center items-center w-[70%] mx-auto gap-10"
      >
        <div className=" w-full">
          <label className="text-xl" htmlFor="em">
            Email Address
          </label>
          <input
            id="em"
            value={data?.email}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
            type="email"
            placeholder="Enter Email Here"
            className=" rounded-xl w-full py-2 text-xl px-3 text-black"
          ></input>
        </div>

        <div className=" w-full flex flex-col justify-start items-start gap-1 relative">
          <label className="text-xl" htmlFor="pa">
            Password
          </label>

          <div className=" w-full relative">
          <input
            id="pa"
            value={data?.password}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
            className=" w-full py-2 text-xl px-3 rounded-xl  text-black"
            type={showPass ? "text" : "password"}
            placeholder="Enter Password Here"
          ></input>
          {
            !showPass ? <IoEye className=" absolute right-3 bottom-3 text-black text-2xl" onClick={()=>{setShowPass(!showPass)}} /> : <IoEyeOff className=" absolute right-3 bottom-[10px] text-black text-2xl" onClick={()=>{showPass(!showPass)}} />
          }
          </div>
          {
            error!=="" && <div className=" absolute -bottom-[3.9vh] left-2 text-red-500">*{error}</div>
          }
        </div>

        {loading ? (
          <BeatLoader className="bg-blue-500 text-xl px-9 py-4 rounded-2xl hover:bg-blue-600 transition-all" />
        ) : (
          <button className=" bg-blue-500 text-xl px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-200">
            Login
          </button>
        )}
      </form>
    </div>
  );
}
