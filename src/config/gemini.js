import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variable
// IMPORTANT: Never commit your API key to GitHub!
// Create a .env file in the root directory with: VITE_GEMINI_API_KEY=your_key_here
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ VITE_GEMINI_API_KEY is not set!");
  console.error("Please create a .env file in the root directory with:");
  console.error("VITE_GEMINI_API_KEY=your_api_key_here");
  console.error("See SETUP.md for detailed instructions.");
}

// Initialize the Gemini API
let genAI;
if (API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
  } catch (error) {
    console.error("Failed to initialize Gemini API:", error);
    genAI = null;
  }
} else {
  genAI = null;
  console.warn("⚠️ Gemini API not initialized - API key missing");
}

// List of models to try in order of preference (newest first)
const MODEL_NAMES = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-1.5-flash",
  "gemini-1.5-pro", 
  "gemini-pro",
  "gemini-1.0-pro"
];

// Function to fetch available models from the API
export const getAvailableModels = async () => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`);
    const data = await response.json();
    if (data.models) {
      return data.models.map(m => m.name.replace('models/', ''));
    }
    return [];
  } catch (error) {
    console.error("Error fetching available models:", error);
    return [];
  }
};

// Get the generative model with fallback
export const getModel = (modelName = null) => {
  if (!genAI) {
    throw new Error("Gemini API not initialized. Please check your API key in .env file.");
  }
  
  // If a specific model is requested, try it first
  if (modelName) {
    return genAI.getGenerativeModel({ model: modelName });
  }
  
  // Otherwise, try models in order of preference
  // Start with the first one (most preferred)
  return genAI.getGenerativeModel({ model: MODEL_NAMES[0] });
};

// Function to send a message and get response
export const sendMessage = async (prompt, chatHistory = []) => {
  // Check if API key is set
  if (!API_KEY) {
    throw new Error("API key is not configured. Please create a .env file with VITE_GEMINI_API_KEY. See SETUP.md for instructions.");
  }
  
  // Validate prompt first
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    throw new Error("Prompt cannot be empty");
  }
  
  // Build the conversation history in the format expected by Gemini API
  const history = chatHistory
    .filter(msg => msg && msg.role && msg.parts) // Filter out invalid messages
    .map(msg => {
      const text = typeof msg.parts === 'string' ? msg.parts : String(msg.parts || '');
      if (!text.trim()) return null; // Skip empty messages
      
      return {
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: text }]
      };
    })
    .filter(msg => msg !== null); // Remove null entries

  let lastError = null;
  let triedModels = [];
  
  // First, try to get available models from the API
  let availableModels = [];
  try {
    availableModels = await getAvailableModels();
    console.log("Available models from API:", availableModels);
  } catch (error) {
    console.warn("Could not fetch available models, using default list:", error);
  }
  
  // Use available models if we got them, otherwise use the default list
  let modelsToTry = MODEL_NAMES;
  if (availableModels.length > 0) {
    // Filter to only models that are actually available
    modelsToTry = MODEL_NAMES.filter(name => {
      // Check if any available model name contains this model name
      return availableModels.some(avail => {
        const modelPart = name.replace('gemini-', '');
        return avail.includes(modelPart) || avail === name;
      });
    });
    // If filtering removed all models, use the original list
    if (modelsToTry.length === 0) {
      modelsToTry = MODEL_NAMES;
    }
  }
  
  const finalModelsToTry = modelsToTry;
  
  // Try each model until one works
  for (const modelName of finalModelsToTry) {
    triedModels.push(modelName);
    try {
      const model = getModel(modelName);
      
      // Start a chat session with history (if any)
      let chat;
      try {
        if (history.length > 0) {
          chat = model.startChat({
            history: history,
          });
        } else {
          chat = model.startChat();
        }
      } catch (historyError) {
        console.warn("Error starting chat with history, trying without history:", historyError);
        // Fallback: start chat without history
        chat = model.startChat();
      }

      // Send the message and get response
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();

      // Success! Return the response
      console.log(`Successfully used model: ${modelName}`);
      return text;
    } catch (error) {
      // Log the full error for debugging
      console.error(`Error with model ${modelName}:`, {
        message: error.message,
        error: error.error,
        status: error.status,
        statusText: error.statusText
      });
      
      // Check if it's a model-related error
      const errorStr = (error.message || '').toLowerCase();
      const errorDetails = error.error || {};
      const errorDetailsStr = JSON.stringify(errorDetails).toLowerCase();
      
      const isModelError = errorStr.includes("model") || 
                          errorStr.includes("not found") || 
                          errorStr.includes("404") ||
                          errorStr.includes("invalid model") ||
                          errorDetailsStr.includes("model") ||
                          errorDetailsStr.includes("not found") ||
                          error.status === 404;
      
      if (isModelError) {
        // Save the error and try the next model
        lastError = error;
        console.warn(`Model ${modelName} not available (${error.message || 'unknown error'}), trying next model...`);
        continue;
      } else {
        // If it's not a model error (e.g., API key, quota, etc.), throw immediately
        console.error("Non-model error occurred:", error);
        throw error;
      }
    }
  }
  
  // If all models failed, provide a helpful error message
  if (lastError) {
    console.error("All models failed. Tried models:", triedModels);
    console.error("Last error details:", {
      message: lastError.message,
      error: lastError.error,
      status: lastError.status
    });
    
    // Check if it's an API key issue
    const errorStr = (lastError.message || '').toLowerCase();
    if (errorStr.includes("api key") || errorStr.includes("api_key") || errorStr.includes("permission") || errorStr.includes("403")) {
      throw new Error("Invalid API key or insufficient permissions. Please check your Gemini API key.");
    }
    
    throw new Error(`No available Gemini models found. Tried: ${triedModels.join(', ')}. Please check your API key and ensure you have access to Gemini models. Error: ${lastError.message || 'Unknown error'}`);
  }
  
  throw new Error("No available models found");
};
