const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing in .env");
    return;
  }

  console.log("Using API Key:", apiKey.substring(0, 10) + "...");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    console.log("Attempting to generate content with gemini-2.0-flash...");
    const result = await model.generateContent("Hello, are you there?");
    const response = await result.response;
    const text = response.text();
    console.log("Success! Response:", text);
  } catch (error) {
    console.error("Gemini API Test Failed with gemini-2.0-flash:");
    console.error("Message:", error.message);
  }
}

test();
