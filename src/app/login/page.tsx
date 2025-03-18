"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";


const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", user);

      if (data.success) {
        toast.success("Login Successful!");
        router.push("/profile");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password ));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
        {loading? "Processing":"Login"}
        </h1>
        <hr className="mb-4" />

        <label className="block font-medium mt-3">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label className="block font-medium mt-3">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={onLogin}
          className={`w-full mt-4 p-2 text-white font-medium rounded-md 
          ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 transition duration-200"
          }`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill All Fields" : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
