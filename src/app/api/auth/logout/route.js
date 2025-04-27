import path from "path";

import { getData, putData } from "@/app/api/utils";
import dbAddress  from "@/db";

const tokenFilePath = path.join(dbAddress, "tokenRegistry.json");

export async function POST(req) {
  try {
    const { token } = await req.json();

    const tokens = await getData(tokenFilePath);
    const updatedTokens = tokens.filter(
      (existingToken) => existingToken !== token
    );

    await putData(tokenFilePath, updatedTokens);

    return new Response(
      JSON.stringify({ message: "User logged out successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error during logout:", error);
    return new Response(JSON.stringify({ err: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
