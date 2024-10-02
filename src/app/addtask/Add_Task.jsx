"use client";

import { useState , useContext } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import Imgg from "../../assets/tasks.png"
import Image from "next/image";
import { Task_Add_BE_URL } from "../api_url";
import { connectWithdb } from "@/helper/dbConnection";
import { UserContext } from "@/helper/userContext";

export default function ShowTasks() {
  const [data, setData] = useState({ title: "", content: "" });
  const [loading , setLoading] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(data);

  // connectWithdb()

  const submitHandler = async (e) => {
    e.preventDefault();
    if (data.title.trim() === "") {
      toast.error("Enter title please!!!");
      return;
    }
    if (data.content.trim() === "") {
      toast.error("Enter Content please!!!");
      return;
    }
    
    setLoading(true);
    try {
      const api = await fetch(
        Task_Add_BE_URL  + user?._id + "/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const dataa = await api.json();
      console.log(dataa);
    toast.success("New Task Added😊")
    setData( {title : "" , content : ""} )
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something Went Wrong");
    }

    setLoading(false)
  };

  return (
    <div className="  w-[75%] mx-auto flex flex-col items-center justify-evenly min-h-[80vh] py-10">
      <h1 className=" text-5xl">Add Task</h1>
      <form
        onSubmit={submitHandler}
        className=" border border-white p-10 rounded-2xl flex flex-col justify-center items-center w-[70%] mx-auto gap-5"
      >
        <Image src={Imgg} alt="Image" className=" w-32"></Image>
        <input
          value={data?.title}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
          type="text"
          placeholder="Enter Title Here"
          className=" rounded-xl w-full py-2 text-xl px-3 text-black"
        ></input>
        <textarea
          value={data?.content}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, content: e.target.value };
            })
          }
          className=" w-full py-2 text-xl px-3 rounded-xl  text-black"
          rows={3}
          type="text"
          placeholder="Enter Content Here"
        ></textarea>
      
        { loading ? <BeatLoader className="bg-blue-500 text-xl px-9 py-4 rounded-2xl hover:bg-blue-600 transition-all" /> : <button className=" bg-blue-500 text-xl px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-200">
          Add Task
        </button>}
      </form>
    </div>
  );
}
