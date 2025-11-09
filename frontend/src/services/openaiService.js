import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api/chat";
const TIMEOUT = 20000;

export const generateAIText = async (fieldName, formData) => {
  try {
    const response = await axios.post(
      BACKEND_URL,
      { fieldName, formData },
      { timeout: TIMEOUT }
    );

    return response.data.reply;
  } catch (error) {
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      throw new Error("Request timed out. Try again.");
    }

    if (error.response) {
      if (error.response.status === 429)
        throw new Error("Rate limit exceeded. Please try later.");
      if (error.response.status === 401)
        throw new Error("Unauthorized request.");
    }

    throw new Error(error.message || "Failed to get AI response.");
  }
};
