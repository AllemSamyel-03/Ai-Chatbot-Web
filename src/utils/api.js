const API_URL = "https://ai-chatbot-backend-gd1f.onrender.com";

export const getAIResponse = async (messages) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("Unable to get AI response. Please try again.");
  }

  const data = await response.json();

  return data?.choices?.[0]?.message?.content || "No response received.";
};
