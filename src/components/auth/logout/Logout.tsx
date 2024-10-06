"use client"
import { useRouter } from "next/navigation";
import React from 'react'

const Logout = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
          const res = await fetch("/api/logout", {
            method: "POST",
          });
    
          if (res.ok) {
            console.log("Logout successful");
            router.push("/login"); // Redirect to login page
          }
        } catch (error) {
          console.error("Logout error:", error);
        }
      };
  return (
    <div>
       <button
          onClick={handleLogout}
          className="btn bg-red  mt-3"
        >
          Logout
        </button>
    </div>
  )
}

export default Logout
