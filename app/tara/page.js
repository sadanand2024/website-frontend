"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // useEffect(() => {
  //   // Optional: Check if user is authenticated here
  //   const token = localStorage.getItem("authToken");

  //   if (!token) {
  //     // Redirect to login if not authenticated
  //     router.push("/login");
  //   }
  // }, [router]);

  return <h3>Home Dashboard </h3>;
}
