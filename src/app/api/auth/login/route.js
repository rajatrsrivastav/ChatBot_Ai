import path from "path";
import { getData, postData } from "@/app/api/utils";
import dbAddress from "@/db";

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
    const users = await getData(filePath);
    const existingUser = users.find((user) => user.email === email);
    if (!existingUser) {
      return new Response(JSON.stringify({ err: "User does not exist" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (existingUser.password !== password) {
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
  const file =
    process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "src", "db", "tokenRegistry.json")
      : path.join(dbAddress, "tokenRegistry.json");

  const token = new Date().toISOString() + "#@#" + email;
  await postData(file, token);
  return token;
};
