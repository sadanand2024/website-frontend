// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  // Handle logout logic
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear cookies if you are using them for authentication (e.g., JWT)
  response.cookies.delete("auth_token"); // Adjust based on your cookie name
  response.cookies.delete("refresh_token"); // If you're using a refresh token in cookies

  // Optionally clear other session data or tokens stored in cookies

  // Respond back to frontend
  return response;
}
