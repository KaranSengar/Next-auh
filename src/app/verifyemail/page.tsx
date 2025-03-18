"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    console.log("Extracted Token:", urlToken);
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const { data } = await axios.post("/api/users/verifyemail", { token });
      console.log("Verification Response:", data);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.error("Verification Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      
      <div className="p-2 mt-2 bg-orange-500 text-white font-medium rounded-md">
        {token ? `Token: ${token}` : "No Token Found"}
      </div>

      {verified && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded-md">
          <h2>Email Verified Successfully! 🎉</h2>
          <Link href="/login" className="text-blue-200 underline">Go to Login</Link>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded-md">
          <h2>Verification Failed! ❌</h2>
          <p>Invalid or expired token.</p>
        </div>
      )}
    </div>
  );
}
