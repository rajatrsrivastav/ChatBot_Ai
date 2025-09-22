import User from "@/models/user";
import { createConnection } from "@/config/db";
await createConnection();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify(JSON.stringify({ message: "User already exists" })),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const user = new User({ email, password });

    const savedUser = await user.save();

    return new Response(
      JSON.stringify({ message: "User created successfully", user: savedUser }),
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
