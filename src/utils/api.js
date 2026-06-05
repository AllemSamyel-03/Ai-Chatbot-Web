const API_URL = "http://localhost:5000/api/chat";

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
