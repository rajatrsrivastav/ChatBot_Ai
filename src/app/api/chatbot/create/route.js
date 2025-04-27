import { createChatbot, verifyToken } from "../../utils";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken || !verifyToken(accessToken)) {
      return new Response(JSON.stringify({ err: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const email = accessToken.split("#@#")[1];
    const { name, context } = await req.json();
    await createChatbot({ name, context, email });
    return new Response(
      JSON.stringify({ message: "chatbot created successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ err: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}