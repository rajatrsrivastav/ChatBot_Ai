export const askGemini = async ({ text, context }) => {
  const response = await fetch("/api/ai/askGemini", {
    method: "POST",
    body: JSON.stringify({ text, context }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    console.error("Gemini API Error:", error);
    throw new Error(error || "Unknown Gemini API error");
  }

  return response.json();
};
