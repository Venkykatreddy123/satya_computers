const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing in .env");
    return;
  }

  console.log("Using API Key:", apiKey.substring(0, 10) + "...");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log("Fetching models...");
    
    // There isn't a direct 'listModels' in the simple JS SDK, we'd need to use the REST API or the client 
    // but we can try to use a very basic model name to see if it's the model name issue.
    // However, 404 often means the API itself or the project is restricted.

    // Let's try gemini-pro (the older one) as a fallback check
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("test");
    console.log("Success with gemini-pro!");
  } catch (error) {
    console.error("Gemini API Test Failed with gemini-pro:");
    console.error("Message:", error.message);
  }
}

listModels();
