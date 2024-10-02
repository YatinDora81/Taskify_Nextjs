"use client";

import React, { useState, useEffect, useContext } from "react";
import { GET_ALL_TASKS_OF_USER, UPDATE_TASK_BE_URL } from "../api_url";
import { UserContext } from "@/helper/userContext";
import toast from "react-hot-toast";
import { TiPencil } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const ShowTaskPage = () => {
  const [alltasks, setAllTasks] = useState([]);
  const { user } = useContext(UserContext);
  const [isModal, setIsModal] = useState({
    open: false,
    title: "",
    content: "",
    status: "",
    id : ""
  });
  // console.log(alltasks);

  // console.log(isModal);

  const fetchTasks = async () => {
    try {
      if (user?._id) {
        const d = await fetch(GET_ALL_TASKS_OF_USER + user?._id + "/tasks", {
          method: "GET",
        });
        const dd = await d.json();
        if (dd?.success === true) {
          setAllTasks(dd?.data?.reverse());
          // console.log(dd);
        } else {
          console.log(dd?.message);
          toast.error(dd?.message);
        }
      }
    } catch (error) {
      console.log("Error in fetching task", error);
    }
  };

  const deleteTask = async (idd) => {
    try {
      const d = await fetch(
        GET_ALL_TASKS_OF_USER + user?._id + "/tasks/" + idd,
        {
          method: "DELETE",
        }
      );
      const dd = await d.json();

      if (dd?.success) {
        fetchTasks();
        toast.success("Tasks Deleted");
      } else {
        toast.error("Error in deleting the task");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting the task");
    }
  };

  const updateTask = async ()=>{
    try {
      if (user?._id) {
        const d = await fetch(UPDATE_TASK_BE_URL + user?._id + "/tasks/" +isModal?.id ,{
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title : isModal?.title , content : isModal?.content , status : isModal?.status }),
        });
        const dd = await d.json();
        if (dd?.success === true) {
          await fetchTasks()
          toast.success("Task Updated Successfully😊")
          setIsModal( {open: false,
            title: "",
            content: "",
            status: "",
            id : ""} )
          // console.log(dd);
        } else {
          console.log(dd?.message);
          toast.error(dd?.message);
        }
      }
    } catch (error) {
      console.log("Error in fetching task", error);
    }
    
  }

  useEffect(() => {
    if (user?._id) fetchTasks();
  }, [user]);

  return (
    <div className=" w-full  min-h-[80vh]  relative">
      { isModal?.open && <div
        onClick={() => setIsModal({
          open: false,
          title: "",
          content: "",
          status: "",
          id : ""
        })}
        className=" text-black absolute backdrop-blur-sm h-[90vh] w-[100%] top-0 left-0 flex justify-center items-center rouxl"
      >
        <div
        onClick={(e)=>e.stopPropagation()}
          className=" relative overflow-y-auto z-[11] h-[50%] w-[45%] bg-blue-200 flex  justify-center items-center flex-col gap-3 rounded-2xl"
        >
          <div onClick={(e) => {
            e.stopPropagation()
            setIsModal({
              open: false,
              title: "",
              content: "",
              status: "",
              id : ""
            })}} className=" absolute top-3 border rounded-full border-black cursor-pointer hover:opacity-80 transition-all duration-100 right-3 text-2xl"><IoClose></IoClose></div>
          <div className=" flex flex-col justify-center items-center gap-2 w-full ">
            <input
            className=" w-[70%] bg-gray-900 text-white py-2 px-3  rounded-xl"
              value={isModal?.title}
              onChange={(e) => {
                setIsModal({ ...isModal, title: e.target.value , open : true });
              }}
              type="text"
              placeholder="Enter Title here!!!"
            ></input>
            <textarea
            className=" max-h-[60%] w-[70%] bg-gray-900 text-white py-2 px-3  rounded-xl"
              value={isModal?.content}
              onChange={(e) => {
                setIsModal({ ...isModal, content: e.target.value });
              }}
              placeholder="Enter Content Here!!!"
              rows={4}
            ></textarea>
            <div className=" w-full text-center">
              <label className="text-xl font-semibold" htmlFor="lop">Status : </label>
            <select
            id="lop"
            data-limit-rows="true"
              className="  w-[50%] text-center bg-gray-900 text-white py-2 px-3  rounded-xl"
              value={isModal?.status}
              onChange={(e) => {
                setIsModal({ ...isModal, status: e.target.value });
              }}
            >
              <option value="just-added">Just-Added</option>
              <option vlaue="pending">Pending</option>
              <option value="complete">Complete</option>
            </select>
            </div>
          </div>
          <div onClick={updateTask} className=" cursor-pointer font-semibold bg-blue-700 py-2 px-7 text-xl rounded-2xl text-gray-300">Update</div>
        </div>
      </div>}

      <div className=" w-[70%] flex flex-col gap-3 py-4 mx-auto">
        {alltasks?.length === 0 ? (
          <div className=" text-3xl text-center py-10">No Tasks is Present</div>
        ) : (
          <div className="flex flex-col justify-start gap-5 ">
            <h1 className="text-4xl text-center mt-5">
              Total Tasks : {alltasks?.length}
            </h1>
            {alltasks?.map((t) => (
              <div
                key={t?._id}
                className={` flex border justify-between items-center  p-4  ${
                  t?.status === "complete" ? "bg-green-900" : "bg-slate-950"
                } `}
              >
                <div className=" flex flex-col max-w-[80%] gap-4">
                  <div className=" font-bold text-3xl">Title : {t?.title}</div>
                  <div className=" text-xl">Content : {t?.content}</div>
                  <div className=" text-xl font-semibold">
                    Status : {t?.status}
                  </div>
                </div>
                <div className=" text-white flex justify-center items-center gap-3">
                  <button onClick={()=>{setIsModal( { open : true , title : t?.title , content : t?.content , status : t?.status , id : t?._id } )}} className=" text-2xl border rounded-full p-2">
                    <TiPencil></TiPencil>
                  </button>
                  <button
                    onClick={() => deleteTask(t?._id)}
                    className=" text-2xl border rounded-full p-2"
                  >
                    <IoClose></IoClose>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTaskPage;
