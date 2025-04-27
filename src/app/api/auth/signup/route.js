import path from "path";

import { getData, postData } from "@/app/api/utils";
import dbAddress from "@/db";

const filePath = path.join(dbAddress, "users.json");

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const users = await getData(filePath);

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return new Response(
        JSON.stringify(JSON.stringify({ message: "User already exists" })),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await postData(filePath, { email, password });

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error during user registration:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
