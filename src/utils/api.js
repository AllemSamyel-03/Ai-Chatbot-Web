const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.API_KEY;
const model = "meta-llama/llama-3-8b-instruct";

export const getAIResponse = async (messages) => {
  if (!API_KEY || API_KEY === "your_api_key") {
    return "Add your OpenRouter API key in the `.env` file to get live AI responses.";
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to get AI response. Please try again.");
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "No response received.";
};
