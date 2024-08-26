"use client"
import { Snippet } from 'next/font/google';
import React, { useRef, useState ,useEffect } from 'react';
import Tost from './toastify';
import { Bounce, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { disableInstantTransitions, motion, useTime } from 'framer-motion';

const getlocalitems = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(localStorage.getItem('list'));
  }else{
    return[];
  }
}

   

const Page = () => {
    const [task, settask] = useState("")
    const [desc,setdesc] = useState("")
    const [mainTask,setmainTask] = useState(getlocalitems());


    const submitHandler = (e) => {
        e.preventDefault()
        if(task.trim() === "") return toast.warning("Enter Task");
        setmainTask([...mainTask ,{task,desc,
          time: new Date().toLocaleDateString(),
        }])
        settask('')
        setdesc('')
        toast.info("Task added successfully!");
    }
     
    const deleteHandler = (i) =>{
     let copy = [...mainTask]
     copy.splice(i,1)
     setmainTask(copy)
     toast.error("Task Deleted")
          
    }

    const handlecomplete = (i) => {
      let copy = [...mainTask]
      copy.splice(i,1)
      setmainTask(copy)
      toast.success("Task Completed")
           
    };

    

  


    let renderTask = <h1 className='text-xl' >No Task Available</h1>;
  
    if (mainTask.length > 0) {
      renderTask = mainTask.map((t,i)=>{
        return (
          
        <ol   key={i} className={`flex items-center justify-between mb-4 ${task.completed ? 'line-through' : ""} py-1 px-4 rounded bg-zinc-300`}>
          <div className='mb-5 w-2/3 '>
      
           <h5 className='text-2xl font-semibold cursor-pointer '> 
            <button onClick={()=>handlecomplete(i)}  className='h-3 w-3 rounded-lg border hover:scale-125 duration-300 hover:bg-zinc-800 border-black mr-3 cursor-pointer'  />
             {t.task} <span className='text-xs ml-5'>{t.time}</span> </h5> 
          <h5 className='text-xl font-medium ml-10  truncate '>  { t.desc}  </h5><hr/>
        </div>
      
        <button onClick={()=>
          deleteHandler(i)
      } className='bg-red-700 text-white px-4  py-2 rounded font-semibold hover:bg-red-600 hover:scale-110 duration-300' >Remove</button>
        </ol>
        );
      });
   
    }

     // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(mainTask));
  }, [mainTask]);


    

  
 

    
  return(
    <div>
    <h1 className="bg-black text-white p-5 text-5xl font-semibold text-center ">Yash's ToDO List</h1>
    <form onSubmit={submitHandler}  > 
      <input 
       placeholder='Enter Task Here'
       type='text'
       autoFocus 
        className=' rounded text-2xl border-zinc-900 border-2 m-5 px-4 py-2' 
        value={task} 
        onChange={(e)=>{settask(e.target.value)}} />

<input 
       placeholder='Enter Details Here'
       type='text'
        className=' rounded text-2xl border-zinc-900 border-2 m-5 px-4 py-2' 
        value={desc} 
        onChange={(e)=>{setdesc(e.target.value)}} />
      <button  className=' bg-black text-white px-4 py-2 text-2xl font-semibold rounded m-5 hover:bg-zinc-900 hover:scale-110 duration-300'>Add Task</button>
    
    </form>
    
    <hr/>
    <div className='p-8 bg-zinc-200 m-5 rounded '>
     <ul>{renderTask}</ul>
     
    
    </div>
    <hr/>
    
       <Tost/>
    </div>
  )
}

export default Page