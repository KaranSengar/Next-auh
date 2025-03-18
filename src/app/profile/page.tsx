"use client"

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Profile = () => {
  const [data, setdata] = useState("nothing");
  const route = useRouter();

  const getuser = async () => {
    const { data } = await axios.post("/api/users/me");
    console.log(data);
    setdata(data.data._id);
  };

  const logout = async () => {
    try{
   await axios.get('/api/users/logout')
   toast.success("logout successfully")
   route.push("/login")
    }catch(err:any){
        console.log(err.message)
        toast.error(err.message)
    }
  };
  return(
  <div  className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <h1>Profile page</h1>
    <hr />
    <h2> {data==="nothing"?"Nothing":<Link href={`/profile/${data}`}>test {data}
    </Link>}</h2>
    <hr />
    <div className="flex mt-4">
    <button 
  onClick={logout} 
  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-full sm:w-auto"
>
  Logout
</button>

<button 
  onClick={getuser} 
  className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-full sm:w-auto mt-10 sm:mt-0 sm:ml-4"
>
  Get Data
</button>
    </div>
   

  </div>
)};

export default Profile;
