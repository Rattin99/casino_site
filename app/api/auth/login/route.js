import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Ensure this is in .env

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const [rows] = await db.query("SELECT * FROM admins WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const admin = rows[0];
    
    // Check password (assuming stored passwords are hashed with bcrypt)
    // If your existing passwords are plain text, you might need to migrate them or use simple comparison temporarily.
    // For now, we attempt bcrypt.
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    // Fallback for plain text (NOT RECOMMENDED FOR PRODUCTION but useful if migrating)
    // const isPasswordValid = password === admin.password; 

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create Token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
