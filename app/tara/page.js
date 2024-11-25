"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // useEffect(() => {
  //   // Check if the user has submitted the form, otherwise show a modal
  //   const formSubmitted = localStorage.getItem("formSubmitted");
  //   if (!formSubmitted) {
  //     router.push("/dashboard"); // If not, redirect back to dashboard page to show the modal
  //   }
  // }, [router]);

  return (
    <div>
      <h1>Welcome to Tara</h1>
    </div>
  );
}
