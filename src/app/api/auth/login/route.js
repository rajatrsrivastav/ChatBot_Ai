import bcrypt from "bcrypt";
import path from "path";
import dbAddress from "@/db";
import User from "@/models/user";
import Token from "@/models/token";
import { createConnection } from "@/config/db";
await createConnection();

// Conditionally set the file path based on environment
let filePath;
if (process.env.NODE_ENV === "production") {
  filePath = path.join(process.cwd(), "src", "db", "users.json");
} else {
  filePath = path.join(dbAddress, "users.json");
}

console.log(filePath, "<----");

export async function POST(req) {
  try {

    const { email, password } = await req.json();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new Response(JSON.stringify({ err: "User does not exist" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ err: "Password does not match" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const token = await registerToken(email);
    return new Response(
      JSON.stringify({ token, message: "User logged in successfully" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ err: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

const registerToken = async (email) => {
  const token = new Date().toISOString() + "#@#" + email;
  const newToken = new Token({ token });
  return newToken.save();
};
