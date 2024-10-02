import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectWithdb } from "./helper/dbConnection";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  
  // connectWithdb()  

  if (
    request.nextUrl.pathname === "/api/users/signup" ||
    request.nextUrl.pathname === "/api/users/login"
  ) {
    // console.log("Loggin api ");
    return NextResponse.next();
  }
  const token = request.cookies.get("authToken")?.value;
  let isValid = false;
  try {
    isValid = await jsonwebtoken.decode(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Error in verify token", error);
  }
  // console.log("t" ,token);

  if (
    request.nextUrl.pathname === "/auth/signup" ||
    request.nextUrl.pathname === "/auth/login"
  ) {
    if (token && isValid) {
      return NextResponse.redirect(new URL("/showtasks", request.url));
    } else {
      // Allow users to access login/signup if they don't have a valid token
      return NextResponse.next();
    }
  }

  if (token && isValid) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/addtask",
    "/showtask",
    "/api/:path*",
    "/auth/login",
    "/auth/signup",
  ],
};
