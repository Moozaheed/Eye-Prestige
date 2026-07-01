import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const USERS_FILE = path.join(process.cwd(), "lib/users.json");
const SALT = "eye-prestige-admin-secret-salt-2026";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    if (!fs.existsSync(USERS_FILE)) {
      return NextResponse.json({ success: false, error: "Database not seeded" }, { status: 500 });
    }

    const fileData = fs.readFileSync(USERS_FILE, "utf8");
    const users = JSON.parse(fileData);

    const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
    }

    const incomingHash = crypto.createHash("sha256").update(password + SALT).digest("hex");
    if (incomingHash !== user.passwordHash) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
    }

    // Generate stateless token
    const token = crypto.createHash("sha256").update(email.toLowerCase() + SALT).digest("hex");

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Login API Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
