import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error("VITE_API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

export const generateAIResponse = async (
  prompt: string,
  history: { role: 'user' | 'model'; text: string }[]
) => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Convert history to format expected by the SDK if using chat, 
    // but here we will use generateContent for simplicity with a constructed prompt context
    // or use the chat feature properly.
    
    // Let's use the chat API for better context management
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `You are SecSpace AI, an expert corporate secretary assistant for business owners. 
        Your tone is professional, reassuring, and concise. 
        You help with questions about company law, compliance, directors, shares, and administrative processes.
        Do not give specific legal advice; always suggest consulting a lawyer for complex disputes.
        Format your answers with clear headings and bullet points where possible.
        The user is a business owner, not a lawyer, so explain things simply.`,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};
